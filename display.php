<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <link href="css/mirror.css" rel="stylesheet" type="text/css">
  <link href="css/datetime.css" rel="stylesheet" type="text/css">
  <link href="css/opnv.css" rel="stylesheet" type="text/css">
  <link href="css/news.css" rel="stylesheet" type="text/css">
  <link href="css/weather.css" rel="stylesheet" type="text/css">

  <script src="js/jquery-2.2.1.min.js"></script>
  <script src="js/promise-7.0.4.min.js"></script>
  <script src="js/moment-with-locales.min.js" charset="utf-8"></script>
  <script src="js/weather.js"></script>
  <script src="js/opnv.js"></script>
  <script src="js/news.js"></script>

  <script type='text/javascript'>
    moment.locale('de');

    $(function() {
      localStorage["loggedWinErrors"] = "";

      var oldError = window.onerror || function(){};
      window.onerror = function(err, url, line){
        oldError.call(this, err, url, line);
        var err = "\n Error: (file: "+ url +", message: "+ err +", line: "+ line +")";
        localStorage["loggedWinErrors"] += err;
      }

      setDateTime();

      setMessageText();

      new Opnv().run();

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
  </div>

  <div id="opnv">
    <div class="opnv-platform" id="opnv-platform-1">
      <h4></h4>
      <ul></ul>
    </div>
    <div class="opnv-platform" id="opnv-platform-2">
      <h4></h4>
      <ul></ul>
    </div>
    <div class="opnv-platform" id="opnv-platform-3">
      <h4></h4>
      <ul></ul>
    </div>
    <div class="opnv-platform" id="opnv-platform-4">
      <h4></h4>
      <ul></ul>
    </div>
  </div>

  <div id="news"></div>

  <div id="weather">
    <div id="weather_now">
      <img id="weather_now_img" />
      <div id="weather_now_desc"></div>
    </div>

    <div class="weather_forecast_hourly">
      <div class="weather_forecast" id="weather_forecast_hour1">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_temp"></div>
        <img class="weather_forecast_img" />
      </div>
      <div class="weather_forecast" id="weather_forecast_hour2">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_temp"></div>
        <img class="weather_forecast_img" />
      </div>
      <div class="weather_forecast" id="weather_forecast_hour3">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_temp"></div>
        <img class="weather_forecast_img" />
      </div>
    </div>

    <div class="weather_forecast_daily">
      <div class="weather_forecast" id="weather_forecast_day1">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_tempMax"></div>
        <div class="weather_forecast_tempMin"></div>
        <img class="weather_forecast_img" />
      </div>
      <div class="weather_forecast" id="weather_forecast_day2">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_tempMax"></div>
        <div class="weather_forecast_tempMin"></div>
        <img class="weather_forecast_img" />
      </div>
      <div class="weather_forecast" id="weather_forecast_day3">
        <div class="weather_forecast_text"></div>
        <div class="weather_forecast_tempMax"></div>
        <div class="weather_forecast_tempMin"></div>
        <img class="weather_forecast_img" />
      </div>
    </div>
  </div>
</body>
</html>