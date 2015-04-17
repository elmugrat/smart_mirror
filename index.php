<!DOCTYPE html>
<html>
<head>
	<link href="css/mirror.css" rel='stylesheet' type='text/css'>
	<link href="css/datetime.css" rel='stylesheet' type='text/css'>
	<link href="css/weather.css" rel='stylesheet' type='text/css'>
	
	<script src='js/jquery-2.1.3.min.js'></script>
	<script src='js/moment-with-locales.min.js'></script>
	<script src='js/forecast.io.js'></script>
	<script src='js/fahrplan.js'></script>
	<script type='text/javascript'>
		moment.locale('de', {
		    calendar : {
		        lastDay : '[gestern, der] D. MMMM',
		        sameDay : '[heute, der] D. MMMM',
		        nextDay : '[morgen, der] D. MMMM',
		        lastWeek : '[letzte Woche] dd[, der] D. MMMM',
		        nextWeek : 'dd[, der] D. MMMM',
		        sameElse : 'L'
		    }
		});
		
		var currentGitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';

		$(function() {
			setDateTime();

			$('#testbutton').click(refreshDepartures);

			refreshDepartures();

			refreshWeather();

			autoUpdate();
		});

		function autoUpdate() {
			$.getJSON('gitHash.php', {}, function(json, _status) {
				if (json && json.latestGitHash != currentGitHash) {
					window.location.reload();
                    window.location.href=window.location.href;
				}
			});

			setTimeout(autoUpdate, 300000);
		}

		function setDateTime() {
			$('#time').html(moment().format('HH:mm'));
			$('#date').html(moment().format('dddd[, der ] L'));

			setTimeout(setDateTime, 5000);
		}
	</script>
	<style type='text/css'>
	#testbutton {
		display: block;
		width: 200px;
		margin: 15px;
		padding: 15px;
		text-align: center;
		border: 1px solid green;
	}
	</style>
</head>
<body>
	<!--<div id="testbutton">click me</div>-->
	
	<div id="message"></div>
	
	<div id="datetime">
		<div id="time"></div>
		<div id="date"></div>
		<div id="opnv">
			<div class="haltestelle" id="bindestr_rathaus"><div>M3 <span>&#10143;</span> Rathaus</div><ul></ul></div>
			<div class="haltestelle" id="gliesmaroderstr_uni"><div>M19 <span>&#10143;</span> Uni</div><ul></ul></div>
			<div class="haltestelle" id="gliesmaroderstr_hbf"><div>M29 <span>&#10143;</span> Hbf</div><ul></ul></div>
		</div>
	</div>
	
	<div id="weather">
		<div id="weather_now">
			<img id="weather_now_img" />
			<div id="weather_now_desc"></div>
		</div>
		
		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour0600">
			<div class="weather_forecast_text">06:00</div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>
		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour1200">
			<div class="weather_forecast_text">12:00</div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>
		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour1800">
			<div class="weather_forecast_text">18:00</div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_temp"></div>
		</div>
		<div class="weather_forecast weather_forecast_hourly" id="weather_forecast_hour2400">
			<div class="weather_forecast_text">24:00</div>
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
		<div class="weather_forecast weather_forecast_daily" id="weather_forecast_day4">
			<div class="weather_forecast_text"></div>
			<img class="weather_forecast_img" />
			<div class="weather_forecast_tempMin"></div>
			<div class="weather_forecast_tempMax"></div>
		</div>
	</div>
</body>
</html>
