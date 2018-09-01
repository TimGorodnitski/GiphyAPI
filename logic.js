let animals = ["dog", "cat", "bird"]

for (i = 0; i < animals.length; i++) {

    let b = $("<button>").val(animals[i]).text(animals[i]).addClass("animalButton");
    $("#buttonDiv").append(b);

}

$(".animalButton").on("click", function () {
    var animal = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        results = response.data;

        console.log(results);
        for (var i = 0; i < results.length; i++) {

            let animalDiv = $("<div>").addClass("picDiv");

            let p = $("<p>").text(results[i].rating);

            let animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url).attr("data-state", "still");
            $(animalDiv).append(p);
            $(animalDiv).append(animalImage);
            $("#gifDiv").prepend(animalDiv);
        }
    })
});

$(".gif").on("click", function () {

    state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    };

    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  });

