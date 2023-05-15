var express = require('express');
var router = express.Router();
var db = require("../services/db")

/* GET home page. */
router.get('/', function (req, res, next) {
    var user = req.session.user;
    res.render('leaderboard', { 'user': user });
});

router.post('/', async function(req, res, next) {
    var body = req.body;
    
    var name = body.name ? body.name : "%";
    var map = body.map;
    var difficulty = body.difficulty;

    console.log(name, map, difficulty);

    var out = await db.getLeaderboard(name, map, difficulty);

    console.log(out)
    
    res.send(out);
});

module.exports = router;
