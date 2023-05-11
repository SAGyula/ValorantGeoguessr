$("#timer").on("change mousemove", function () {
    var time = $(this).val();
    var output = "";

    var min = Math.floor(time / 6);
    var sec = (time % 6) * 10;

    if (min) {
        output += `${min} min`;

        if (min > 1)
            output += "s";
    }

    if (sec) {
        if (output)
            output += ",";

        output += ` ${sec} secs`;
    }

    $("#time").text(output);
});

$("input[type='radio']").on("click", function() {
    $("#continue").attr("disabled", false);
});