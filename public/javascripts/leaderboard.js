var records = {};

$("#search").on("click", function () {
    try {
        var name = $("#uo")[0].checked ? user : "%";
    } catch {
        
    }
    
    var map = $("#map").val();
    var difficulty = $("#difficulty").val();
    map = map == "all" ? "%" : map;
    difficulty = difficulty == "all" ? "%" : difficulty;

    $("#tbody").html("<td>loading...</td>");

    $.post("/leaderboard", { name: name, map: map, difficulty: difficulty }, res => loadLeaderboard(res));
});

function loadLeaderboard(res) {
    records = JSON.parse(JSON.stringify(res));
    records.sort(function(a, b) {b.points - a.points});

    $("#tbody").html("");

    records.forEach(element => {
        $("#tbody").append(`<tr>
            <td>${records.indexOf(element) + 1}#</td>
            <td>${element.name}</td>
            <td>${element.points}</td>
            <td>${element.time}</td>
            <td>${element.map}</td>
            <td>${element.difficulty}</td>
        </tr>`)
    });

    if ($("tbody").is(":empty")) {
        $("#tbody").html("<td>No matching data found</td>");
    }
}

$(document).ready(() => {
    $("#search").trigger("click");
});