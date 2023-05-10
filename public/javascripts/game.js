var selectedLocations = [];
var roundsPlayed = 0;
var currentLocation;
var showingScore = false, showingResult = false;
var x, y;
var answers = [];
var points = 0;
var currentPoint = 0;

var randomMaps = [];
var isRandom = false;

var totalTime = 0;
var currentTime = 0;
var timer;

const MAX_POINT = 5000;
const MAX_DISTANCE = 200;
const MIN_DISTANCE = 8;
const MAX_ROUND = 5;

$("#map").on("click", function (e) {
    var offset = $(this).offset();

    x = e.pageX - offset.left;
    y = e.pageY - offset.top;

    $("#marker").css("right",
        `${$(window).width() - (offset.left + $(this).outerWidth()) + (500 - x) - 2.5}px`
    ).css("bottom",
        `${$(window).height() - (offset.top + $(this).outerHeight()) + (500 - y) - 2.5}px`
    );

    $("#guess").attr("disabled", false);
});

function showScore() {
    showingScore = true;
    $("#game").css("display", "none");
    $("#score").css("display", "flex");

    $("#top > img").attr("src", `/images/minimaps/${map}.png`)

    var offset = $("#top > img").offset();
    var markers = `<div class="answer" style="top: ${offset.top + y - 10}px; left: ${offset.left + x - 10}px"></div>`
    markers += `<div class="solution" style="top: ${offset.top + currentLocation.y - 10}px; left: ${offset.left + currentLocation.x - 10}px"><i class="fa-solid fa-font-awesome"></i></div>`
    var svg = `<svg width="500" height="500" style="top: ${offset.top}; left: ${offset.left}" id="connection">
            <g fill="none" stroke="blue" stroke-width="2">
                <path stroke-dasharray="4, 4" d="M${x} ${y} l${currentLocation.x - x} ${currentLocation.y - y}"/>
            </g>
        </svg>`

    $("#cr-score").text(currentPoint);
    $("#t-score").text(points)
    $("#t-total").text(`of ${MAX_POINT * roundsPlayed}`);

    if (x == 2000 || y == 2000) {
        $("#markers").html("");
        return;
    }

    $("#markers").html(svg + markers);
}

function mapChange() {
    var selMap = $("input[name='map']:checked").val()
    var selectedMapLocs = randomMaps.map((e, i) => e === selMap ? i : '').filter(String);
    $("#res-top > img").attr("src", `/images/minimaps/${selMap}.png`);
    var offset = $("#res-top > img").offset();


    var markers = "";
    var svg = `<svg width="500" height="500" style="top: ${offset.top}; left: ${offset.left}" id="connection">
            <g fill="none" stroke="blue" stroke-width="2">`;
    selectedMapLocs.forEach(e => {
        var loc = selectedLocations[e];
        var [cx, cy] = answers[e];

        if (cx != 2000 || cy != 2000) {

            markers += `<div class="answer" style="top: ${offset.top + cy - 10}; left: ${offset.left + cx - 10}">${e + 1}</div>`;
            markers += `<div class="solution" style="top: ${offset.top + loc.y - 10}; left: ${offset.left + loc.x - 10}"><i class="fa-solid fa-font-awesome"></i></div>`;

            svg += `<path stroke-dasharray="4, 4" d="M${cx} ${cy} l${loc.x - cx} ${loc.y - cy}"/>`;
        }
    });
    svg += `</g></svg>`;

    $("#res-markers").html(svg + markers);
}

function showResult() {
    showingResult = true;
    $("#game").css("display", "none");
    $("#score").css("display", "none");
    $("#result").css("display", "flex");

    $("#res-score").text(points);

    if (!isRandom) {
        var markers = "";
        $("#res-top > img").attr("src", `/images/minimaps/${map}.png`);
        var offset = $("#res-top > img").offset();
        var svg = `<svg width="500" height="500" style="top: ${offset.top}; left: ${offset.left}" id="connection">
            <g fill="none" stroke="blue" stroke-width="2">`;

        for (let i = 0; i < MAX_ROUND; i++) {
            var loc = selectedLocations[i];
            var [cx, cy] = answers[i];

            if (cx == 2000 || cy == 2000)
                continue;

            markers += `<div class="answer" style="top: ${offset.top + cy - 10}; left: ${offset.left + cx - 10}">${i + 1}</div>`;
            markers += `<div class="solution" style="top: ${offset.top + loc.y - 10}; left: ${offset.left + loc.x - 10}"><i class="fa-solid fa-font-awesome"></i></div>`;

            svg += ` <path stroke-dasharray="4, 4" d="M${cx} ${cy} l${loc.x - cx} ${loc.y - cy}"/>`;

            $("#res-markers").html(svg + markers);
        }
        svg += `</g></svg>`;
    } else {
        var mapRadio = ""

        new Set(randomMaps).forEach(element => {
            mapRadio += `<input type="radio" name="map" value="${element}">`;
        });
        
        $("#maps").html(mapRadio);
        $("input[name='map']:first-child").attr('checked', true);

        $("input[name='map']").on("change", () => {mapChange()});

        mapChange();
    }
}

$("#next-btn").on("click", () => { next_location() });
$("#exit-btn").on("click", () => { location = "/" });
$("#res-exit").on("click", () => { location = "/" });
$("#res-retry").on("click", () => { location.reload() });

function guess() {
    if ($("#guess").attr("disabled"))
        return;

    if (timer) 
        clearInterval(timer);

    var distance = currentLocation.distance([x, y]);
    answers.push([x, y]);
    roundsPlayed++;

    distance -= 8;
    distance = distance < 0 ? 0 : distance;
    distance = (MAX_POINT / MAX_DISTANCE) * distance;
    currentPoint = Math.ceil(MAX_POINT - distance)
    currentPoint = currentPoint < 0 ? 0 : currentPoint;
    points += currentPoint;

    showScore();
}

function showTime() {
    var time = `${Math.floor(currentTime/60)}: ${currentTime % 60 < 10 ? "0" + (currentTime%60).toString() : currentTime%60}`;
    $("#timer").text(time);
}

function next_location() {
    showingScore = false, showingResult = false;
    $("#game").css("display", "flex");
    $("#score").css("display", "none");

    $("#marker").css("right", -5).css("bottom", -5);

    if (roundsPlayed == 5) {
        showResult();
        return;
    }

    currentTime = roundTime * 10;
    showTime();
    timer = setInterval(() => {
        currentTime--;
        showTime();

        if (currentTime == 0) {
            x = 2000; y = 2000;
            $("#guess").attr("disabled", false);
            guess();
        }
    }, 1000)

    currentLocation = selectedLocations[roundsPlayed];
    $("body").css("background-image", `url(${currentLocation.map})`);
    $("#image").attr("src", currentLocation.map);

    if (isRandom) {
        map = randomMaps[roundsPlayed]
        $("#map").attr("src", `/images/minimaps/${map}.png`)
    }

    $("#guess").attr("disabled", true);
}

function random() {
    var availableMaps = Object.keys(locations);

    do {
        var random = availableMaps[Math.floor(Math.random() * availableMaps.length)];

        if ([...new Set(randomMaps)].length < 4 || [...new Set(randomMaps)].includes(random))
            randomMaps.push(random);
    } while (randomMaps.length < MAX_ROUND)

    do {
        var map = randomMaps[selectedLocations.length]
        const availableLocations = locations[map][difficulty];
        var curr = availableLocations[Math.floor(Math.random() * availableLocations.length)];

        if (!selectedLocations.includes(curr))
            selectedLocations.push(curr);
    } while (selectedLocations.length < MAX_ROUND)

    isRandom = true;
    next_location();
}

function main() {
    if (map == "random") {
        random();
        return;
    }

    const availableLocations = locations[map][difficulty];
    $("#map").attr("src", `/images/minimaps/${map}.png`)

    do {
        var curr = availableLocations[Math.floor(Math.random() * availableLocations.length)];

        if (!selectedLocations.includes(curr))
            selectedLocations.push(curr);
    } while (selectedLocations.length < MAX_ROUND);

    next_location();
}

$("#guess").on("click", () => guess())
$(document).on("keypress", function (e) {
    if (e.code == "Space")
        if (!showingScore && !showingResult)
            guess();
        else if (showingScore)
            next_location();
})

main();