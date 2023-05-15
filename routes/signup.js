var express = require('express');
var router = express.Router();
var db = require("../services/db");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup');
});
router.post('/', async function(req, res, next) {
    var name = req.body.username;
    var pass = req.body.password;
    var repass = req.body.repassword;

    if (!name || !pass || !repass) {
        res.render('signup', {message: "Fill out all the fields!"});
        return;
    }

    if (pass !== repass) {
        res.render('signup', {message: "Passwords have to match!"});
        return;
    }

    var ret = await db.addUser(name, pass);

    if (!ret) {
        res.render('signup', { message: "Username is already taken. Choose another one!" });
        return;
    }

    res.redirect('/')
});

module.exports = router;