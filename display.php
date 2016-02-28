<!DOCTYPE html>
<html>
<head>
	<link href="css/mirror.css" rel='stylesheet' type='text/css'>
	<link href="css/datetime.css" rel='stylesheet' type='text/css'>
	<link href="css/news.css" rel='stylesheet' type='text/css'>
	<link href="css/weather.css" rel='stylesheet' type='text/css'>

	<script src='js/moment-with-locales.min.js'></script>
	<script src='js/fahrplan.js'></script>
	<script src='js/news.js'></script>
	<link href="css/weather.css" rel="stylesheet" type="text/css">
	<script src="js/jquery-2.2.1.min.js"></script>
	<script src="js/weather.js"></script>
	<script type='text/javascript'>
		moment.locale('de');

		$(function() {
			setDateTime();

			setMessageText();

			refreshDepartures();

			refreshWeather();

      showNews();
		});

		function setDateTime() {
			$('#time').html(moment().format('HH:mm'));
			$('#date').html(moment().format('dddd[, der ] L'));

			setTimeout(setDateTime, 5000);
		}

		function setMessageText() {
			$.getJSON('index.php?action=get', {}, function(json, _status) {
				if (json) {
					$('#message h1').html(json.message);
				}
			});

			setTimeout(setMessageText, 60000);
		}
	</script>
</head>
<body>
	<div id="message"><h1></h1></div>

	<div id="datetime">
		<div id="time"></div>
		<div id="date"></div>
		<div id="opnv">
			<div class="haltestelle" id="bindestr_rathaus"><div>M3 <span>&#10143;</span> Rathaus</div><ul></ul></div>
			<div class="haltestelle" id="gliesmaroderstr_uni"><div>M19 <span>&#10143;</span> Uni</div><ul></ul></div>
			<div class="haltestelle" id="gliesmaroderstr_hbf"><div>M29 <span>&#10143;</span> Hbf</div><ul></ul></div>
		</div>
	</div>

  <div id="news"></div>

	<div id="weather">
		<div id="weather_now">
			<img id="weather_now_img" />
			<div id="weather_now_desc"></div>
		</div>

		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour1">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>
		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour2">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>
		<div class="weather_forecast weather_forecast_hourly last" id="weather_forecast_hour3">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>

		<div class="weather_forecast weather_forecast_daily" id="weather_forecast_day1">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_tempMin"></div>
			<div class="weather_forecast_tempMax"></div>
		</div>
		<div class="weather_forecast weather_forecast_daily" id="weather_forecast_day2">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_tempMin"></div>
			<div class="weather_forecast_tempMax"></div>
		</div>
		<div class="weather_forecast weather_forecast_daily" id="weather_forecast_day3">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_tempMin"></div>
			<div class="weather_forecast_tempMax"></div>
		</div>
	</div>
</body>
</html>
