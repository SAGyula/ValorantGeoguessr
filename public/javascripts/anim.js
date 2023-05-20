var svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#afafaf" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
<circle cx="50" cy="50" r="23" stroke-width="8" stroke="#ebebeb" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
</circle>
</svg>`

$("#submit").on("click", function () {
    $("#submit").html(svg);
});

$(".passcont > i").on("click", function () {
    var input = $(".passcont > input");
    var type = $(".passcont > input").attr("type") == 'password' ? "text" : "password";
    input.attr('type', type)

    console.log(input, type, input.attr("type"));

    $(this).toggleClass("fa-eye-slash");
    $(this).toggleClass("fa-eye");
})
$(".repasscont > i").on("click", function () {
    var input = $(".repasscont > input");
    var type = $(".repasscont > input").attr("type") == 'password' ? "text" : "password";
    input.attr('type', type)

    $(this).toggleClass("fa-eye-slash");
    $(this).toggleClass("fa-eye");
})

console.log("works")