// Searchbar handler
$(function(){
  const searchField = $('#query');

});
$('#search-form').submit(function(e){
  e.preventDefault();
});

function search (){
  // get the results clear first
  $("#results").html('');
  $('#buttons').html('');

  // get data from form
  q = $('#query').val();

// get request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type:'video',
      key:'AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8',
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // log data
        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);

          // display results
          $('results').append(output);
        });
    }
 )};
}

// Build output
function getOutput(item){
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
    '<h3>' +title+ '</h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
    '<p>' +description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';

    return output;



}
