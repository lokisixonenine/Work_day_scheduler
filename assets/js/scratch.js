$(document).ready(function () {

    var todaysDate = moment().format('MMMM D, YYYY<br>h:mm a');
    var todaysTime = moment().format("HH");

    var timeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    var workDay = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
    var numericalS = ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four", "five", "six", "seven"];

    $("#currentDay").append(todaysDate);
  
    for (var i = 0; i < workDay.length; i++) {
        var nextRow = $("<row>");
        $(".container").append(nextRow);
        var column1 = $("<col>");
        var column2 = $("<col>");
        nextRow.append(column1, column2);
        column1.attr("class", "col-2 hour");
        column2.attr("class", "col-9 input");
        column2.attr("id", numericalS[i]);
        column2.html("<textarea rows='3'style='width: 100%; margin-left:-2rem; height: 100%'></textarea>");
        nextRow.addClass("time-block row");
        nextRow.attr("id", timeArray[i]);
        var newBtn = $("<button>");
        newBtn.attr("id", workDay[i]);
        newBtn.attr("class", "saveButton fas fa-save col-1");
        nextRow.append(newBtn);
        if (workDay[i] === 12) {
            column1.text(workDay[i] + "PM");
        } else if (workDay[i] > 8) {
            column1.text(workDay[i] + "AM");
        } else { column1.text(workDay[i] + "PM") };
    }

    $("row").each(function () {
        var getID = parseInt($(this).attr("id"));
        console.log("id= " + getID);

        if (parseInt(todaysTime) < 9 || parseInt(todaysTime) > 19) {
            $(this).addClass("past");
        } if (getID < parseInt(todaysTime)) {
            $(this).addClass("past");
        } if (getID > parseInt(todaysTime)) {
            $(this).addClass("future");
        } if (getID === parseInt(todaysTime)) {
            $(this).addClass("present");

        }

    })

    var saveButton = $(".saveButton");
    saveButton.on("click", function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        console.log($(this).siblings(".input").children("textarea"));
        console.log($(this).siblings(".input").children("textarea").val());

        var hour = $(this).attr("id");
        var note = $(this).siblings(".input").children("textarea").val();

        localStorage.setItem(hour, note);
    })

    for (let i=0; i < workDay.length; i++) {
    $("#"+numericalS[i]).children("textarea").text(localStorage.getItem(workDay[i]));
    }
})


