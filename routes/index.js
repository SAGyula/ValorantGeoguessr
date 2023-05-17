var express = require('express');
var router = express.Router();
var db = require("../services/db");

/* GET home page. */
router.get('/', async function (req, res, next) {
    var user = req.session.user;
    if (user) {
        var userObj = (await db.checkUser(user))[0];
        var pfp = userObj.pfp;
    } else {
        var pfp = "";
    }

    res.render('index', { 'user': user, pfp: pfp});
});

module.exports = router;
