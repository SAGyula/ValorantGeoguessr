var express = require('express');
var router = express.Router();
var User = require("./user")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});
router.post('/', function(req, res, next) {
    var name = req.body.username;
    var pass = req.body.password;

    if (!pass || !name) {
        res.render('login', {message: "Fill out all the fields!"});
        return;
    }

    console.log(name, pass)
    var user = User.auth(name, pass);
    console.log(user)
    if (user) {
        req.session.user = user;
        res.redirect("/");
    } else {
        res.render("login", {message: "Wrong username or password!"})
    }
});

module.exports = router;