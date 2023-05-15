class Carousel {
    constructor() {
        this.carousel_data = [
            {
                id: 1,
                map: "Ascent",
                src: "/images/Logo/Ascent.png"
            },
            {
                id: 2,
                map: "Bind",
                src: "/images/Logo/Bind.png"
            },
            {
                id: 3,
                map: "Breeze",
                src: "/images/Logo/Breeze.png"
            },
            {
                id: 4,
                map: "Fracture",
                src: "/images/Logo/Fracture.png"
            },
            {
                id: 5,
                map: "Haven",
                src: "/images/Logo/Haven.png"
            },
            {
                id: 6,
                map: "Icebox",
                src: "/images/Logo/Icebox.png"
            },
            {
                id: 7,
                map: "Lotus",
                src: "/images/Logo/Lotus.png"
            },
            {
                id: 8,
                map: "Pearl",
                src: "/images/Logo/Pearl.png"
            },
            {
                id: 9,
                map: "Split",
                src: "/images/Logo/Split.png"
            },
            {
                id: 10,
                map: "Random",
                src: "/images/Logo/Random.png"
            }
        ];
        this.container;
        this.items = [];
        this.selected;
    }

    setupCarousel() {
        this.container = document.createElement('div');
        this.container.className = "container";

        for (let i = 0; i < this.carousel_data.length; i++) {
            var data = this.carousel_data[i];
            var item = document.createElement('img');

            item.setAttribute("src", data.src);
            item.className = `carousel-item carousel-item-${i}`;
            item.setAttribute("id", i+1);

            this.container.append(item)
            this.items.push(item);
        }

        $(".carousel").append(this.container);

        $(".carousel-item").on("click", function() {
            mapCarousel.goTo($(this));
        })
    }

    shift(amount) {
        var shifted = this.carousel_data.splice(-amount, amount);
        for (const element of shifted)
            this.carousel_data.unshift(element);

        shifted = this.items.splice(-amount, amount);
        for (const element of shifted)
            this.items.unshift(element);
    }

    unshift(amount) {
        var shifted = this.carousel_data.splice(0, amount);
        for (const element of shifted)
            this.carousel_data.push(element);

        var shifted = this.items.splice(0, amount);
        for (const element of shifted)
            this.items.push(element);
    }

    goTo(item) {
        var classes = item.attr("class").split(" ");
        var e = classes[1];
        var id = e[e.length - 1];

        if (id < 4) {
            var shift = -id+4;
            this.shift(shift)
        } else if (id > 5) {
            this.unshift(id - 5)
        }

        for (let i = 0; i < this.items.length; i++) {
            var element = this.items[i];

            element.className = `carousel-item carousel-item-${i}`;
        }

        $(".selected").removeClass("selected");
        item.addClass("selected");

        var mapId = item[0].getAttribute("id");
        var selected = this.carousel_data.find(value => value.id == mapId);
        var map = selected.map;
        this.selected = map;
        $("#map-name").text(map);

        $("#select").attr("disabled", false);
    }
}

var mapCarousel = new Carousel();
mapCarousel.setupCarousel();