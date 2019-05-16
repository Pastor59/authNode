const router = require('express').Router()
const passport = require('passport')

router.get('/login',(req, res) => {
    res.render('login', {user: req});
});

//auth logout
router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req, res,next) => {
    //console.log("Redirect", req);
    //res.render('profile', {user: req.user});
    //res.redirect('/profile');
    console.log("Session", req.session);
    res.render('profile', { user:req.user }, function(err, html) {
        res.send(html);
    });
});

module.exports = router;