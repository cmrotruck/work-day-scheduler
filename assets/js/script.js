var tasks = [];

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // loop over object properties
    $.each(tasks, function (index) {
            $("#" + tasks[index].hour + "-text").text(tasks[index].text);            
    });

}

var getTodaysDate = function () {
    //sets current date and adds it to the DOM
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

var createTimeBlock = function (hour) {
    var timeBlockEl = document.createElement("div");
    timeBlockEl.classList = "time-block row";
    timeBlockEl.id = hour + "-block";

    var hourBlock = document.createElement("div");
    hourBlock.className = "hour align-right col-1";

    var hourBlockTextEl = document.createElement("p");
    hourBlockTextEl.textContent = hour;

    hourBlock.appendChild(hourBlockTextEl);

    var textArea = document.createElement("textarea");
    textArea.className = "col-10";
    textArea.textContent = "";
    textArea.id = hour + "-text";

    var btnSave = document.createElement("button");
    btnSave.className = "saveBtn col-1";
    btnSave.id = hour + "-save";

    var btnSaveImageEl = document.createElement("span");
    btnSaveImageEl.classList = "far fa-save";

    btnSave.appendChild(btnSaveImageEl);

    timeBlockEl.appendChild(hourBlock);
    timeBlockEl.appendChild(textArea);
    timeBlockEl.appendChild(btnSave);



    $(".container").append(timeBlockEl);
}
var addTimeBlocks = function () {
    createTimeBlock("12AM");
    createTimeBlock("1AM");
    createTimeBlock("2AM");
    createTimeBlock("3AM");
    createTimeBlock("4AM");
    createTimeBlock("5AM");
    createTimeBlock("6AM");
    createTimeBlock("7AM");
    createTimeBlock("8AM");
    createTimeBlock("9AM");
    createTimeBlock("10AM");
    createTimeBlock("11AM");
    createTimeBlock("12PM");
    createTimeBlock("1PM");
    createTimeBlock("2PM");
    createTimeBlock("3PM");
    createTimeBlock("4PM");
    createTimeBlock("5PM");
    createTimeBlock("6PM");
    createTimeBlock("7PM");
    createTimeBlock("8PM");
    createTimeBlock("9PM");
    createTimeBlock("10PM");
    createTimeBlock("11PM");
    $(".container .time-block").each(function (index, el) {
        //console.log(el.id.split("-")[0]);
        auditTimeBlock(el.id.split("-")[0]);
    });
}

var auditTimeBlock = function (hour) {
    // var currentHour = moment().format("H");
    // var calendarHour = moment(hour,"hA").format("H");
    // console.log(currentHour);
    // console.log(calendarHour);
    // if (currentHour === calendarHour){
    //     $("#" + hour + "-text").addClass("present");
    //     console.log("present");
    // }
    // else if(currentHour > calendarHour){
    //     $("#" + hour + "-text").addClass("past");
    //     console.log("past");
    // }
    // else if(currentHour < calendarHour){
    //     $("#" + hour + "-text").addClass("future");
    //     console.log("future");
    // }
    // else{
    //     console.log("No match found!");
    // }

    var currentTime = moment(hour, "H A");

    if (moment().isSame(currentTime, 'hour')) {
        $("#" + hour + "-text").addClass("present");
        // console.log(hour + ' is same');
        // console.log("present");
    }
    if (moment().isAfter(currentTime, 'hour')) {
        $("#" + hour + "-text").addClass("past");
        // console.log(hour + ' is past');
        // console.log("past");
    }
    else if (moment().isBefore(currentTime, 'hour')) {
        $("#" + hour + "-text").addClass("future");
        // console.log(hour + ' is past');
        // console.log("future");
    }
    else {
        // console.log("No match found!");
    }
};

getTodaysDate();
addTimeBlocks();
loadTasks();

$(".saveBtn").on("click", function () {
    var hour = this.id.split("-")[0];
    var text = $("#" + hour + "-text").val();

    var task = {
        hour: "",
        text: ""
    }

    //var calendarHour = moment(hour,"hA").format("H"); //turns time into 24 hour time (ex: 2PM = 14)
    task.hour = hour;
    task.text = text;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

setInterval(function () {
    $(".container .time-block").each(function (index, el) {
        //console.log(el.id.split("-")[0]);
        auditTimeBlock(el.id.split("-")[0]);
    });
}, 1000 * 60 * 60)

