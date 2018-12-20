var gifsArray = ["X-Men", "Avengers", "Daredevil", "Punisher"];
// displaygifsInfo function re-renders the HTML to display the appropriate content
function displaygifsInfo() {
  var gifName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5t8FD89RvqT1gn8HLFlcgRRm6u9af9j9&q=" + gifName + "&limit=10&offset=0&rating=G&lang=en"
//   if ($("#gifs-view").length){
//        $("#gifs-view").empty(); 
//       }
  // Creates AJAX call for the specific gifs button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $.each(response.data, function (index, value){
      var gifURLStill = response.data[index].images.fixed_height_still.url;
      var gifURLAni =response.data[index].images.fixed_height.url;
      var gifRating = response.data[index].rating;
      var gifDiv = $("<div class='gif'>");
      var ratingP = $("<p>").text("Rated: " + gifRating);
      var actualGif =$("<img>").attr("src",gifURLStill).attr("data-animate", gifURLAni).attr("data-still", gifURLStill).attr("data-state", "still").addClass("gif-image");
      gifDiv.append(ratingP).append(actualGif);
      $("#gifs-view").append(gifDiv);
    });
  });
}
// Function to display the buttons
function renderButtons() {
    //Cleans out old space
    $("#buttons-view").empty();
    for (var i = 0; i < gifsArray.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-outline-secondary display-gifs");
        a.attr("data-name", gifsArray[i]);
        a.text(gifsArray[i]);
        $("#buttons-view").append(a);
    }
}
// This function handles events where the add gifs button is clicked
$("#add-gifs").on("click", function(event) {
    event.preventDefault();
    var gifs = $("#gifs-input").val().trim();
    if (gifs != ''){
        gifsArray.push(gifs);
        renderButtons();
  }
});
//Animate (or stop animation) of Gifs on click
$(document).on("click", ".gif-image", function(){
    var currentState = $(this).attr("data-state");
    console.log("state: " + currentState);
    if (currentState === "still") {
        $(this).attr("src",$(this).attr("data-animate")).attr("data-state","animate");
    } else {
        $(this).attr("src",$(this).attr("data-still")).attr("data-state","still");
    }
});
// Adding click event listeners to all elements with a class of "gifs"
$(document).on("click", ".display-gifs", displaygifsInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();