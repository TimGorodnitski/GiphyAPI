let animals = ["dog", "cat", "bird"]

for (i = 0; i < animals.length; i++) {
    let newButton = $("<button>").val(animals[i]).text(animals[i]).addClass("animalButton");
    $("#buttonDiv").append(newButton);
};

$(document).on("click", ".animalButton", function () {
    var animal = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=r&offset=" + Math.floor(Math.random() * 1000);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        results = response.data;

        console.log(results);
        for (var i = 0; i < results.length; i++) {

            let animalDiv = $("<div>").addClass("picDiv");

            let p = $("<p>").text("rating: " + results[i].rating);

            let animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url).attr("data-state", "still").attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url);
            animalImage.addClass("gif");
            $(animalDiv).append(animalImage);
            $(animalDiv).append(p);

            $("#gifDiv").prepend(animalDiv);
        }

    })
});

$(document).on("click", ".gif", function () {

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

$("#submit").click(function () {

    let b = $("<button>").val($("#newAnimal").val()).text($("#newAnimal").val()).addClass("animalButton");
    $("#buttonDiv").append(b);

});

