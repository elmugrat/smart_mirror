/* global $ */

var newsStarted = false;
var newsItems = null;

var currentItemIndex = 0;

function getNews() {
  newsItems = [];

  $.get('newsProxy.php', function(data) {
    $(data).find('item').each(function() {
      var item = $(this);

      var title = item.find('title').text();
      var desc = item.find('description').text();

      newsItems.push({
        'title': title,
        'desc': desc
      });
    })
  });

  setTimeout(getNews, 1800000);
}

function showNews() {
  if (!newsStarted) {
    getNews();

    newsStarted = true;
  } else if (!newsItems) {
    $('#news').fadeOut();
  } else {
    var item = newsItems[currentItemIndex++ % newsItems.length];
    var html = '<h3>' + item.title + '</h3><p>' + item.desc + '</p>';

    $('#news').fadeOut('slow', function() {
      $(this).html(html).fadeIn('slow');
    });

    if (currentItemIndex >= newsItems.length) {
      currentItemIndex = 0;
    }
  }

  setTimeout(showNews, 30000);
}