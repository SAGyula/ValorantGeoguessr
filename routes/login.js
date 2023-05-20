var express = require('express');
var router = express.Router();
var db = require("../services/db")
var encrypt = require("../services/encrypt")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});
router.post('/', async function(req, res, next) {
    var name = req.body.username;
    var pass = req.body.password;

    if (!pass || !name) {
        res.render('login', {message: "Fill out all the fields!"});
        return;
    }

    var user = (await db.checkUser(name))[0];
    
    if (user && user.salt && encrypt.validatePassword(pass, user.salt, user.password)) {
        req.session.user = user.username;
        res.redirect("/");
    } else {
        res.render("login", {message: "Wrong username or password!"})
    }
});

module.exports = router;