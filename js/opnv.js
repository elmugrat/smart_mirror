/* global moment */

var NUM_PLATFORMS = 3;
var NUM_NEXT_DEPARTURES = 3;

var stations = [
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
  // , {
  //   city: 'Braunschweig',
  //   stop: 'Bahnhof Gliesmarode',
  //   limit: 20,
  //   platforms: [
  //     {
  //       id: 'opnv-platform-4',
  //       name: '3',
  //       longName: 'Bahnhof Gliesmarode'
  //     }
  //   ]
  // }
];

var platformDepartures = {
  lastUpdate: 0,
  finished: 0,
  data: {}
};

function refreshDepartures() {
  var halfHourAgo = moment().subtract(30, 'minutes').unix();

  if (!platformDepartures.lastUpdate || platformDepartures.lastUpdate < halfHourAgo) {
    getDepartures();
  } else {
    updateDeparturesDisplay();
  }
}

function getDepartures(station) {
  if (!station) {
    for (var i = 0; i < stations.length; i++) {
      getDepartures(stations[i]);
    }
  } else {
    $.get('whatEFA/whatEFA.php', station, function(result) {
      if (!!result && result.status === 200) {
        $.each(station.platforms, function(key, platform) {
          if (platform.name in result.data.platforms) {
            var p = {
              name: platform.longName,
              nextDepartureIndex: 0,
              departures: []
            };

            $.each(result.data.platforms[platform.name].transitLines, function(line, lineInfo) {
              for (var i = 0; i < lineInfo.departures.length; i++) {
                p.departures.push({
                  time: lineInfo.departures[i],
                  line: line,
                  to: lineInfo.directionTo.replace('Braunschweig', 'BS').replace('Wolfsburg', 'WOB'),
                  from: lineInfo.directionFrom.replace('Braunschweig', 'BS').replace('Wolfsburg', 'WOB'),
                  type: lineInfo.type
                });
              }
            });

            p.departures.sort(function(a, b) { return a.time - b.time; });

            platformDepartures.data[platform.id] = p;
          }
        });

        if (++platformDepartures.finished >= NUM_PLATFORMS) {
          platformDepartures.finished = 0;
          platformDepartures.lastUpdate = moment().unix();

          updateDeparturesDisplay();
        }
      } else {
        setTimeout(function() {
          getDepartures(station);
        }, 5000);
      }
    });
  }
}

function updateDeparturesDisplay() {
  $.each(platformDepartures.data, function(id, platform) {
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

      var shownDepsCount = p.find('li').length;

      for (var n = shownDepsCount; n < NUM_NEXT_DEPARTURES && platform.nextDepartureIndex < platform.departures.length; n++) {
        var dep = platform.departures[platform.nextDepartureIndex++];

        var time_str = moment.unix(dep.time).format('HH:mm');

        var depHtml = '<li data-time="'+dep.time+'">'+time_str+'<span class="opnv-line">'+dep.line+' &#10143; '+dep.to+'</span></li>';

        $(depHtml).hide().appendTo(p.find('ul')).fadeIn();
      }
    });

    p.fadeIn();
  });

  setTimeout(refreshDepartures, 30000);
}