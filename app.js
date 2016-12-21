/* eslint-env jquery */

// Searchbar handler

$(function() {

  const searchField = $('#query');

    $('#search-form').submit(function(e) {
        e.preventDefault();
        search();
    });

    $('#results').on('click', '.videoLink', function(e){
        e.preventDefault();
        var videoId = $(this).data('id');
        loadVideo(videoId);
    });

    loadPlayer();

});

function loadPlayer(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    window.onYouTubeIframeAPIReady = function() {
        console.log('API READY');
        window.player = new YT.Player('player', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

}

function loadVideo(videoId){
    var url = "http://www.youtube.com/embed/" + videoId + "?enablejsapi=1"
    $('#player').attr('src', url);
}

// SEARCH FUNCTION

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

      //display the player
      $('.videoPlayer').show();
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
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.default.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    var li = $('<li>', {class:'text-container'}); // <li></li>
    var listLeft = $('<div>', {class:'list-left'}); //<div class="list-left"></div>
    var a = $('<a>', {class:'videoLink'}); //<a class='videoLink'><a>
    a.data('id', videoID); //
    var img = $('<img>', {src:thumb}); //<img src="http://...."/>
    a.append(img);
    listLeft.append(a);

    var listRight = $('<div>', {class:'list-right'});
    var titleH4 = $('<h4>');
    titleH4.text(title);

    var cTitle = $('<span>', { class:'cTitle', text: channelTitle});
    var small = $('<small>', {html:'By ' + cTitle.html() + ' on ' + videoDate});
    var description = $('<p>', {text: description});
    listRight.append(titleH4);
    // listRight.append(small);
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
