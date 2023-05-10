var express = require('express');
var router = express.Router();
var User = require("./user")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup');
});
router.post('/', function(req, res, next) {
    var name = req.body.username;
    var pass = req.body.password;
    var repass = req.body.repassword;
    console.log(name, pass, repass, req.body);

    if (!name || !pass || !repass) {
        res.render('signup', {message: "Fill out all the fields!"});
        return;
    }

    if (pass !== repass) {
        res.render('signup', {message: "Passwords have to match!"});
        return;
    }

    var newUser = new User(name, pass);
    req.session.user = newUser;
    User.instances.push(newUser);

    res.redirect('/')
});

module.exports = router;