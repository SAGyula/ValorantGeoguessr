$("#select").on("click", function () {
    if (!mapCarousel.selected)
        return;

    location = `/options/${mapCarousel.selected.toLocaleLowerCase()}`;
});

$("#login").on("click", () => {
    location = "/login";
})
$("#signup").on("click", () => {
    location = "/signup";
})

function openMenu() {
    $("#menu").attr("opened", true);
    $("#account").attr("opened", true);
}
function closeMenu() {
    $("#menu").attr("opened", false);
    $("#account").attr("opened", false);
}

$("#account").on("click", () => openMenu());
$("#close").on("click", () => closeMenu());
$("#signout").on("click", () => { location = "/signout" });

// $(document).ready(() => {
//     if ($("#account").hasClass("loggedin"))
//         $("#menu").css("width", $("#menu").width());
// })