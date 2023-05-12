$("#select").on("click", function() {
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