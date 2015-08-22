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

			// Now
			$('#weather_now_img').attr({
				'src': 'img/weather/' + data.currently.icon + '.png',
				'alt': data.currently.icon
			});
			$('#weather_now_desc').html(data.currently.summary + ' bei ' + Math.round(data.currently.temperature) + '&deg;');

			// Today, 0600
			var hour = moment().hour();
			if (hour >= 6) {
				$('#weather_forecast_hour0600').slideUp();
			} else {
				$('#weather_forecast_hour0600').slideDown();
				var hourData = data.hourly.data[6 - hour];
			
				$('#weather_forecast_hour0600 .weather_forecast_img').attr({
					'src': 'img/weather/' + hourData.icon + '.png',
					'alt': hourData.icon
				});
				$('#weather_forecast_hour0600 .weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');
			}
		
			// Today, 1200
			if (hour >= 12) {
				$('#weather_forecast_hour1200').slideUp();
			} else {
				$('#weather_forecast_hour1200').slideDown();
				var hourData = data.hourly.data[12 - hour];
			
				$('#weather_forecast_hour1200 .weather_forecast_img').attr({
					'src': 'img/weather/' + hourData.icon + '.png',
					'alt': hourData.icon
				});
				$('#weather_forecast_hour1200 .weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');
			}
		
			// Today, 1800
			if (hour >= 18) {
				$('#weather_forecast_hour1800').slideUp();
			} else {
				$('#weather_forecast_hour1800').slideDown();
				var hourData = data.hourly.data[18 - hour];
			
				$('#weather_forecast_hour1800 .weather_forecast_img').attr({
					'src': 'img/weather/' + hourData.icon + '.png',
					'alt': hourData.icon
				});
				$('#weather_forecast_hour1800 .weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');
			}
		
			// Today, 2400
			$('#weather_forecast_hour2400').slideDown();
			var hourData = data.hourly.data[24 - hour];
		
			$('#weather_forecast_hour2400 .weather_forecast_img').attr({
				'src': 'img/weather/' + hourData.icon + '.png',
				'alt': hourData.icon
			});
			$('#weather_forecast_hour2400 .weather_forecast_temp').html(Math.round(hourData.temperature) + '&deg;');

			// Tomorrow
			$('#weather_forecast_day1 .weather_forecast_text').html(moment().add(1, 'day').calendar());
			$('#weather_forecast_day1 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[1].icon + '.png',
				'alt': data.daily.data[1].icon
			});
			$('#weather_forecast_day1 .weather_forecast_tempMax').html(Math.round(data.daily.data[1].temperatureMax) + '&deg;/');
			$('#weather_forecast_day1 .weather_forecast_tempMin').html(Math.round(data.daily.data[1].temperatureMin) + '&deg;');
		
			// Today + 2
			$('#weather_forecast_day2 .weather_forecast_text').html(moment().add(2, 'days').calendar());
			$('#weather_forecast_day2 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[2].icon + '.png',
				'alt': data.daily.data[2].icon
			});
			$('#weather_forecast_day2 .weather_forecast_tempMax').html(Math.round(data.daily.data[2].temperatureMax) + '&deg;/');
			$('#weather_forecast_day2 .weather_forecast_tempMin').html(Math.round(data.daily.data[2].temperatureMin) + '&deg;');
		
			// Today + 3
			$('#weather_forecast_day3 .weather_forecast_text').html(moment().add(3, 'days').calendar());
			$('#weather_forecast_day3 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[3].icon + '.png',
				'alt': data.daily.data[3].icon
			});
			$('#weather_forecast_day3 .weather_forecast_tempMax').html(Math.round(data.daily.data[3].temperatureMax) + '&deg;/');
			$('#weather_forecast_day3 .weather_forecast_tempMin').html(Math.round(data.daily.data[3].temperatureMin) + '&deg;');
		
			// Today + 4
			$('#weather_forecast_day4 .weather_forecast_text').html(moment().add(4, 'days').calendar());
			$('#weather_forecast_day4 .weather_forecast_img').attr({
				'src': 'img/weather/' + data.daily.data[4].icon + '.png',
				'alt': data.daily.data[4].icon
			});
			$('#weather_forecast_day4 .weather_forecast_tempMax').html(Math.round(data.daily.data[4].temperatureMax) + '&deg;/');
			$('#weather_forecast_day4 .weather_forecast_tempMin').html(Math.round(data.daily.data[4].temperatureMin) + '&deg;');
		
			setTimeout(refreshWeather, 600000); // refresh every 10mins
		}
	});
}
