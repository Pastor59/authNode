const router = require('express').Router();

const authCheck = (req, res, next) => {
    console.log(req.session);
    if(!req.user){
        res.redirect('/');
    }else{
       return next();
    }
};

router.get('/', authCheck,(req, res) => {
    if(!req.user){
        res.redirect('/');
    }else{
        res.send('you are logged in, this is your profile - ' + req.user.username );
    }
});

module.exports = router;