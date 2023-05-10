class Location {
    constructor(map, coords) {
        this.map = map;
        this.coords = coords;
        this.x = coords[0];
        this.y = coords[1];
    }

    distance(click) {
        let x = click[0];
        let y = click[1];

        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
}

function title(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}


const coordinates = {
    "ascent": {
        "easy": [
            [219, 343], [272, 356], [208, 73], [126, 48], [153, 382], [428, 305], [245, 156], [210, 121], [178, 155], [309, 385], [196, 362], [261, 248]
        ],
        "medium": [[213, 239], [275, 218], [230, 137], [128, 78], [122, 135], [133, 171], [108, 333], [111, 406], [177, 375], [173, 414], [35, 196]

        ],
        "hard": [[296, 143], [240, 298], [152, 448], [254, 197], [105, 265], [317, 240], [297, 237], [408, 339], [356, 310]]
    },
    "bind": {
        "easy": [
            [379, 317], [385, 118], [100, 180], [266, 301], [103, 94], [409, 203], [202, 207], [148, 184], [322, 168]
        ],
        "medium": [
            [218, 207], [122, 306], [154, 145], [432, 321], [373, 96], [327, 362], [109, 197], [206, 274]
        ],
        "hard": [
            [190, 294], [263, 110], [145, 142], [430, 284], [109, 186], [397, 142], [306, 471], [249, 326], [328, 269], [248, 9], [394, 190]
        ]
    },
    "breeze": {
        "easy": [
            [227, 161], [81, 154], [122, 280], [313, 413], [437, 227], [336, 234], [420, 332], [221, 253]
        ],
        "medium": [
            [253, 467], [319, 16], [333, 178], [191, 350], [78, 311], [225, 131], [341, 91], [208, 214], [85, 296], [275, 273], [354, 216]
        ],
        "hard": [
            [281, 314], [287, 357], [33, 107], [221, 72], [184, 128]
        ]
    },
    "fracture": {
        "easy": [
            [459, 223], [13, 217], [142, 279], [273, 416], [161, 402], [212, 429], [167, 268], [59, 389], [240, 269], [185, 118], [400, 281], [443, 259],
            [459, 294], [392, 280], [392, 280], [280, 323], [267, 268], [404, 232], [378, 171], [362, 137], [359, 84], [360, 67], [276, 39], [230, 36]
        ],
        "medium": [
            [243, 37], [68, 225], [53, 272], [119, 335], [160, 185], [141, 312], [195, 163], [149, 151], [365, 401], [362, 361], [400, 312], [450, 266],
            [434, 258], [433, 268], [393, 230], [332, 270], [309, 335], [340, 340], [297, 248], [325, 259], [370, 183], [328, 99], [256, 100], [334, 424]
        ],
        "hard": [
            [95, 248], [37, 278], [81, 236], [154, 258], [173, 218], [260, 247], [136, 320], [76, 264], [131, 110], [145, 383], [101, 403],
            [290, 465], [290, 465], [340, 442], [332, 387], [351, 387], [408, 382], [420, 368], [436, 358], [245, 377], [313, 381]
        ]
    },
    "haven": {
        "easy": [
            [131, 85], [165, 44], [228, 45], [222, 138], [226, 204], [393, 172], [394, 228],
            [364, 234], [323, 218], [240, 236], [232, 215]
        ],
        "medium": [
            [240, 283], [158, 88], [117, 82], [148, 52], [292, 45], [283, 164], [330, 220]
        ],
        "hard": [
            [34, 196], [68, 171], [164, 74], [257, 100], [226, 163], [115, 147]
        ]
    },
    "icebox": {
        "easy": [
            [225, 63], [95, 220], [386, 447], [273, 232], [391, 46], [305, 118]
        ],
        "medium": [
            [295, 411], [336, 236], [192, 209], [375, 131], [406, 376], [179, 371]
        ],
        "hard": [
            [174, 437], [373, 455], [391, 448], [411, 207], [200, 73], [332, 265] 
        ]
    },
    "pearl": {
        "easy": [
            [44, 360], [260, 250], [423, 209], [221, 477], [298, 352], [284, 21]
        ],
        "medium": [
            [150, 131], [310, 81], [368, 119], [145, 378], [285, 183], [297, 420]
        ],
        "hard": [
            [262, 476], [108, 412], [8, 284], [252, 94], [249, 129], [355, 344]
        ]
    },

    "lotus":{
        "easy": [
            [379, 205], [282, 208], [73, 284], [242, 495], [368, 4], [147, 379], 
        ], 
        "medium": [
            [138, 181], [359, 211], [432, 224], [98, 73], [417, 118], [372, 348], [228, 291]
        ],
        "hard": [
            [19, 237], [376, 0], [470, 81], [325, 395], [125, 323], [379, 390], 
        ],
    },
   

    "split":{
        "easy": [
            [166, 483] , [150, 140], [334, 292], [389, 416], [386, 299], [208, 25]
        ],
        "medium": [
            [137, 148], [188, 340], [82, 265], [288, 80], [349, 357], [256, 468]
        ],
        "hard": [
            [338, 103], [338, 103], [204, 221], [297, 205], [301, 469], [116, 403]
        ],
    },
}

const locations = {
    "ascent": {
        "easy": [],
        "medium": [],
        "hard": [],
    },
    "bind": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "breeze": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "fracture": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "haven": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "icebox": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "pearl": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "lotus": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "split": {
        "easy": [],
        "medium": [],
        "hard": []
    }
}

function define() {
    for (const [map, map_difficulties] of Object.entries(coordinates)) {
        for (const [difficulty, coord_list] of Object.entries(map_difficulties)) {
            for (const coords of coord_list) {
                locations[map][difficulty].push(new Location(`/images/${title(map)}/${title(difficulty)}/kep${coordinates[map][difficulty].indexOf(coords) + 1}.png`, coords))
            }
        }
    }
}

define()