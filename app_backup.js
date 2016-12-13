/* eslint-env jquery */

$(function(){
  $("form").on("submit", function(e) {
    e.preventDefault();
    // request set up
    const request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: 5,
        order: "viewCount",
        publishedAfter: "2015-01-01T00:00:00Z"
    });
     // request activated
     request.execute(function(response){
       console.log(response);
       let results = response.result;
       $.each(results.items, function(index, item){
         console.log(item);
         $("#results").append(item.id.videoId+" "+item.snippet.title+"<br>");
       });
     });
  });
});

function init() {
  // 2. Initialize the JavaScript client library.
  gapi.client.setApiKey("AIzaSyDEXr4oyh0Iaj--3jt1npgIY1X5oALaWy8");
  gapi.client.load("youtube", "v3",function() {
    // youTube API is ready

  });

}
gapi.load("client", init);
