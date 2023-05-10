$("#select").on("click", function() {
    if (!mapCarousel.selected)
        return;

    location = `/options/${mapCarousel.selected.toLocaleLowerCase()}`;
});