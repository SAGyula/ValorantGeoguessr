var records = {};

$("#search").on("click", function () {
    var name = $("#uo")[0].checked ? user : "%";
    var map = $("#map").val();
    var difficulty = $("#difficulty").val();
    map = map == "all" ? "%" : map;
    difficulty = difficulty == "all" ? "%" : difficulty;

    $("#tbody").html("");

    $.post("/leaderboard", { name: name, map: map, difficulty: difficulty }, res => loadLeaderboard(res));
});

function loadLeaderboard(res) {
    records = JSON.parse(JSON.stringify(res));
    records.sort(function(a, b) {b.points - a.points});

    records.forEach(element => {
        $("#tbody").append(`<tr>
            <td>${records.indexOf(element) + 1}#</td>
            <td>${element.name}</td>
            <td>${element.points}</td>
            <td>${element.time}</td>
            <td>${element.map}</td>
            <td>${element.difficulty}</td>
        </tr>`)
    })
}