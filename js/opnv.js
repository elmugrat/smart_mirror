/* global moment */

function Opnv() {
  this.NUM_NEXT_DEPARTURES = 3;

  this.updating = false;

  this.stations = [
    {
      city: 'Braunschweig',
      stop: 'Bindestraße',
      limit: 20,
      platforms: [
        {
          id: 'opnv-platform-1',
          name: 'A',
          longName: 'Bindestraße &#10143; Innenstadt'
        }
      ]
    }, {
      city: 'Braunschweig',
      stop: 'Gliesmaroder Str',
      limit: 40,
      platforms: [
        {
          id: 'opnv-platform-2',
          name: 'C',
          longName: 'Gliesmaroder Straße &#10143; BS-Nord'
        }, {
          id: 'opnv-platform-3',
          name: 'D',
          longName: 'Gliesmaroder Straße &#10143; Hbf'
        }
      ]
    }
  ];

  this.data = {};
}

Opnv.prototype.run = function() {
  this.getDepartures();

  this.updateDisplay();
}

Opnv.prototype.getDepartures = function() {
  var opnv = this;

  this.getDeparturesPromise(this.stations).done(function(results) {
    var data = {};

    for (var i = 0; i < results.length; i++) {
      $.each(results[i].data.platforms, function(key, platform) {
        if (!!platform.id) {
          var p = {
            name: platform.longName,
            nextDepartureIndex: 0,
            departures: []
          };

          $.each(platform.transitLines, function(line, lineInfo) {
            var _to = lineInfo.directionTo.replace('Braunschweig', 'BS').replace('Wolfsburg', 'WOB');
            var _from = lineInfo.directionFrom.replace('Braunschweig', 'BS').replace('Wolfsburg', 'WOB');

            for (var i = 0; i < lineInfo.departures.length; i++) {
              p.departures.push({
                time: lineInfo.departures[i],
                line: line,
                to: _to,
                from: _from,
                type: lineInfo.type
              });
            }
          });

          p.departures.sort(function(a, b) { return a.time - b.time; });

          data[platform.id] = p;
        }
      });
    }

    opnv.updating = true;

    opnv.data = data;

    opnv.updating = false;

    setTimeout($.proxy(opnv.getDepartures, opnv), 1800000); // 30 mins
  }, function(error) {
    setTimeout($.proxy(opnv.getDepartures, opnv), 5000);
  });
}

Opnv.prototype.getDeparturesPromise = function(stations) {
  return Promise.all(stations.map(this.getDeparturesAjax));
}

Opnv.prototype.getDeparturesAjax = function(station) {
  return $.getJSON('whatEFA/whatEFA.php', station, function(result) {
    $.each(station.platforms, function(key, platform) {
      if (platform.name in result.data.platforms) {
        result.data.platforms[platform.name].id = platform.id;
        result.data.platforms[platform.name].longName = platform.longName;
      }
    });
  });
}

Opnv.prototype.updateDisplay = function() {
  if (this.updating) {
    setTimeout(this.refreshDepartures, 5000);
    return;
  }

  var opnv = this;

  $.each(this.data, function(id, platform) {
    var now = moment().unix();

    // Find platform DOM object
    var p = $('.opnv-platform#' + id);

    // Set platform title
    p.find('h4').html(platform.name);

    // Find expired departures
    var toRemove = p.find('li').filter(function() {
      return $(this).data('time') < now;
    });

    // Set up promise object for old departure out-animation
    var animateOutOldDeps = function() {
      return toRemove.animate({ height: 0, opacity: 0 });
    };

    // Remove all out-animated old departures and ensure NUM_NEXT_DEPARTURES departures are shown (if that many are available)
    $.when(animateOutOldDeps()).done(function() {
      toRemove.remove();

      // Fast-forward next departure pointer
      while (platform.nextDepartureIndex < platform.departures.length && platform.departures[platform.nextDepartureIndex].time < now) {
        platform.nextDepartureIndex++;
      }

      var shownDepsCount = p.find('li').length;

      for (var n = shownDepsCount; n < opnv.NUM_NEXT_DEPARTURES && platform.nextDepartureIndex < platform.departures.length; n++) {
        var dep = platform.departures[platform.nextDepartureIndex++];

        var time_str = moment.unix(dep.time).format('HH:mm');

        var depHtml = '<li data-time="'+dep.time+'">'+time_str+'<span class="opnv-line">'+dep.line+' &#10143; '+dep.to+'</span></li>';

        $(depHtml).hide().appendTo(p.find('ul')).fadeIn();
      }
    });

    p.fadeIn();
  });

  setTimeout($.proxy(this.updateDisplay, this), 30000);
}