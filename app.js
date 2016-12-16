/* eslint-env jquery */

// Searchbar handler
$(function() {
  const searchField = $('#query');
  $('#search-form').submit(function(e) {
    e.preventDefault();
    search();
  });
});

function search() {
  // get the results clear first
  $("#results").html('');
  $('#buttons').html('');

  // get data from form
  q = $('#query').val();

  // get request on API

  var url = "https://www.googleapis.com/youtube/v3/search";
  var data = {
    part: 'snippet, id',
    q: q,
    type: 'video',
    key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8'
  };

  var success = function(data) {
    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    // log data
    console.log(data);

    $.each(data.items, function(i, item) {
      // Get Output
      var output = getOutput(item);

      // display results
      $('#results').append(output);
    });

    var buttons = getButtons(prevPageToken, nextPageToken);

    // Display buttons
    $('#buttons').append(buttons);
  }

  $.get(url, data, success, 'json');

}

// Next Page function
function nextPage() {
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');

  // get the results clear first
  $("#results").html('');
  $('#buttons').html('');

  // get data from form
  //q = $('#query').val();

  // get request on API
  var url = "https://www.googleapis.com/youtube/v3/search";
  var data = {
    part: 'snippet, id',
    q: q,
    pageToken: token,
    type: 'video',
    key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8'
  };
  var success = function(data) {
    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    // log data
    console.log(data);

    $.each(data.items, function(i, item) {
      // Get Output
      var output = getOutput(item);

      // display results
      $('#results').append(output);
    });

    var buttons = getButtons(prevPageToken, nextPageToken);

    // Display buttons
    $('#buttons').append(buttons);

  }
  $.get(url, data, success);
}

// Previous Page function
function prevPage() {
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');

  // get the results clear first
  $("#results").html('');
  $('#buttons').html('');

  // get data from form
  //q = $('#query').val();

  // get request on API
  var url = "https://www.googleapis.com/youtube/v3/search";
  var data = {
    part: 'snippet, id',
    q: q,
    pageToken: token,
    type: 'video',
    key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8'
  };
  var success = function(data) {
    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    // log data
    console.log(data);

    $.each(data.items, function(i, item) {
      // Get Output
      var output = getOutput(item);

      // display results
      $('#results').append(output);
    });

    var buttons = getButtons(prevPageToken, nextPageToken);

    // Display buttons
    $('#buttons').append(buttons);

  }
  $.get(url, data, success);

}
// Build output
function getOutput(item) {
  var videoID = item.id.videoID;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  var li = $('<li>'); // <li></li>
  var listLeft = $('<div>', {class: 'list-left'}); //<div class="list-left"></div>
  var img = $('<img>', {src: thumb}); //<img src="http://...."/>
  listLeft.append(img);

  var listRight = $('<div>', {class: 'list-right'});
  var titleH3 = $('<h3>');
  titleH3.text(title);

  var cTitle = $('<span>', {
    class: 'cTitle',
    text: channelTitle
  });
  var small = $('<small>', {
    html: 'By ' + cTitle.html() + ' on ' + videoDate
  });
  var description = $('<p>', {text: description});
  listRight.append(titleH3);
  listRight.append(small);
  listRight.append(description);

  li.append(listLeft);
  li.append(listRight);
  return li;
}

//buttons

function getButtons(prevPageToken, nextPageToken) {
  if (!prevPageToken) {
    var btnoutput = '<div class="button-container">' +
    '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '"data-query="' + q + '"' + 'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">' +
    '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '"data-query="' + q + '"' + 'onclick="prevPage();">Previous Page</button>' + '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '"data-query="' + q + '"' + 'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;
}
