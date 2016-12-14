// Searchbar handler
$(function() {
  const searchField = $('#query');
});

$('#search-form').submit(function(e) {
  e.preventDefault();
});

function search() {
  // get the results clear first
  $("#results").html('');
  $('#buttons').html('');

  // get data from form
  q = $('#query').val();

  // get request on API
  $.get("https://www.googleapis.com/youtube/v3/search", {
    part: 'snippet, id',
    q: q,
    type: 'video',
    key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8',
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // log data
      console.log(data);

      $.each(data.items, function(i, item) {
        // Get Output
        var output = getOutput(item);

        // display results
        $('results').append(output);
      });

      var buttons = getButtons(prevPageToken, nextPageToken);

      // Display buttons
      $('#buttons').append(buttons);
        }
    };
}

  // Next Page function
  function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    // get the results clear first
    $("#results").html('');
    $('#buttons').html('');

    // get data from form
    q = $('#query').val();

    // get request on API
    $.get("https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8',
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // log data
        console.log(data);

        $.each(data.items, function(i, item) {
          // Get Output
          var output = getOutput(item);

          // display results
          $('results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons);

        }
      };
  }

  // Previous Page function
  function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');

    // get the results clear first
    $("#results").html('');
    $('#buttons').html('');

    // get data from form
    q = $('#query').val();

    // get request on API
    $.get("https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8',
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // log data
        console.log(data);

        $.each(data.items, function(i, item) {
          // Get Output
          var output = getOutput(item);

          // display results
          $('results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons);

        }
      };
}
  // Build output
  function getOutput(item) {
    var videoID = item.id.videoID;
    var title = item.snippet.title;
    var description = item.snippet.thumnails.high.url;
    var thumb = item.snippet.thumnails.high.url;
    var channelTitle = item.snippet.publishedAt;

    // Build output string

    var output = '<li>' +
    '<div class="list-left">' +
    '<img src="+thumb+">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3>' + title + '</h3>' +
    '<small>By <span class="cTitle">' + channelTitle + '</span> on ' +
    videoDate + '</small>' +
    '<p>' + description + '</p>' +
    '</div>' + '</li>' +
    '<div class="clearfix"></div>' + '';

    return output;
}

//buttons

function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class="button-container">'+
      '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">'+
      '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'"data-query="'+q+'"' +
        'onclick="prevPage();">Previous Page</button>' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;
}
