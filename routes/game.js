var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:map?', function (req, res, next) {
    const maps = ["ascent", "bind", "breeze", "fracture", "haven", "icebox", "lotus", "pearl", "split", "random"];
    var map = req.params.map;
    var time = req.query.time;
    var difficulty = req.query.difficulty;

    if (!map) {
        next();
        return;
    }

    if (!maps.includes(map)) {
        next();
        return;
    }

    res.render('game', { map: map, time: time, difficulty: difficulty });
}, function (req, res, next) {
    res.redirect("/");
});

module.exports = router;