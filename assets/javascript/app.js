
var animals = ["Lions", "Cats", "Dogs", "Snakes"];
function buttonPush() {
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.addClass("btn btn-info");
        a.addClass("mr-2");
        a.attr("data-animals", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    };
}
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    buttonPush();
});

buttonPush();

function viewAnimals() {
    var animal = $(this).attr("data-animals");
    var queryURL = " https://api.giphy.com/v1/gifs/search?api_key=Yub8YKONF98D0F0LSyb2RRY1cRmnnSrj&q=" + animal;
    $.ajax({
        url: queryURL,
        method: "get"
    }).then(function (response) {
        console.log(response)
        var results = response.data;
        $("#gifs-appear-here").empty();
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            animalDiv.addClass("col-6");
            animalDiv.addClass("col-lg-3");
            var p = $("<p>");
            p.text("Rating: " + results[i].rating);
            animalDiv.append(p);

            var animalImage=$("<img>");
            animalImage.addClass("col-12");
            animalImage.addClass("gif");
            animalImage.attr("src", results[i].images.fixed_width_still.url);
            animalImage.attr("data-still", results[i].images.fixed_width_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_width.url);
            animalImage.attr("data-state", "still");
            
            animalDiv.append(animalImage);
            $("#gifs-appear-here").append(animalDiv);
        }
    });
}


// Create animate function 
function animate(){
    if($(this).attr("data-state")==="still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    }
    else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");

    }
}


$(document).on("click", ".animal", viewAnimals);
$(document).on("click",".gif", animate);
