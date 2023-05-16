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

try {
    console.log(pfp, typeof(pfp));
    $("#pfp").css("filter", `invert(${pfp.split(",")[1]}%) hue-rotate(${pfp.split(",")[0]}deg)`);
} catch (err) {
    console.log(err);
}