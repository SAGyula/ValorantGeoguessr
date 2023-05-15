var express = require('express');
var router = express.Router();
var db = require("../services/db");

/* GET home page. */
router.post('/', async function (req, res, next) {
    var body = req.body;

    var name = req.session.user;

    if (!name) {
        res.status("200");
        res.send();
        return;
    }

    var points = body.points;
    var time = body.time;
    var map = body.map;
    var difficulty = body.difficulty;

    await db.addRecord(name, points, time, map, difficulty);

    res.status("202");
    res.send();
});

module.exports = router;