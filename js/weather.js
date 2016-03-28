var reqUrl = 'https://api.forecast.io/forecast/';
var apiKey = 'c79fedc3fbb215564811d6bd190031bb';
var latLong_wg = '52.2753599,10.5430022';
var opts = '?lang=de' + '&units=ca' + '&exclude[minutely,alerts,flags]';

function refreshWeather() {
	var apiUrl = reqUrl + apiKey + '/' + latLong_wg + '/' + opts;
	$.ajax({
		dataType: 'jsonp',
		url: apiUrl,
		error: function(data) {
			setTimeout(refreshWeather, 300000); // if something goes wrong, try again in 5mins
		},
		success: function(data) {
			//console.log(data);

			var hour = moment().hour();

			// Now
			$('#weather_now_img').attr({
				'src': 'img/weather/' + data.currently.icon + '.png',
				'alt': data.currently.icon
			});
			$('#weather_now_desc').html(data.currently.summary + ' bei ' + Math.round(data.currently.temperature) + '&deg;');

			// Hourly Forecast 1
			var hourData = data.hourly.data[1];
			var target = $('#weather_forecast_hour1');

			target.find('.weather_forecast_text').text(moment().add(1, 'h').format('H[:00]'));
			target.find('.weather_forecast_img').attr({
				'src': 'img/weather/' + hourData.icon + '.png',
				'alt': hourData.icon
			});
			target.find('.weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');

			// Hourly Forecast 2
			hourData = data.hourly.data[4];
			var target = $('#weather_forecast_hour2');

			target.find('.weather_forecast_text').text(moment().add(4, 'h').format('H[:00]'));
			target.find('.weather_forecast_img').attr({
				'src': 'img/weather/' + hourData.icon + '.png',
				'alt': hourData.icon
			});
			target.find('.weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');

			// Hourly Forecast 3
			hourData = data.hourly.data[7];
			var target = $('#weather_forecast_hour3');

			target.find('.weather_forecast_text').text(moment().add(7, 'h').format('H[:00]'));
			target.find('.weather_forecast_img').attr({
				'src': 'img/weather/' + hourData.icon + '.png',
				'alt': hourData.icon
			});
			target.find('.weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');

			// Tomorrow
			$('#weather_forecast_day1 .weather_forecast_text').html(moment().add(1, 'day').format('dd[, der] D. MMMM'));
			$('#weather_forecast_day1 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[1].icon + '.png',
				'alt': data.daily.data[1].icon
			});
			$('#weather_forecast_day1 .weather_forecast_tempMax').html(Math.round(data.daily.data[1].temperatureMax) + '&deg;/');
			$('#weather_forecast_day1 .weather_forecast_tempMin').html(Math.round(data.daily.data[1].temperatureMin) + '&deg;');

			// Today + 2
			$('#weather_forecast_day2 .weather_forecast_text').html(moment().add(2, 'days').format('dd[, der] D. MMMM'));
			$('#weather_forecast_day2 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[2].icon + '.png',
				'alt': data.daily.data[2].icon
			});
			$('#weather_forecast_day2 .weather_forecast_tempMax').html(Math.round(data.daily.data[2].temperatureMax) + '&deg;/');
			$('#weather_forecast_day2 .weather_forecast_tempMin').html(Math.round(data.daily.data[2].temperatureMin) + '&deg;');

			// Today + 3
			$('#weather_forecast_day3 .weather_forecast_text').html(moment().add(3, 'days').format('dd[, der] D. MMMM'));
			$('#weather_forecast_day3 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[3].icon + '.png',
				'alt': data.daily.data[3].icon
			});
			$('#weather_forecast_day3 .weather_forecast_tempMax').html(Math.round(data.daily.data[3].temperatureMax) + '&deg;/');
			$('#weather_forecast_day3 .weather_forecast_tempMin').html(Math.round(data.daily.data[3].temperatureMin) + '&deg;');

			setTimeout(refreshWeather, 600000); // refresh every 10mins
		}
	});
}