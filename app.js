const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');
app.set(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true },() => {
    console.log('connected to mongo db');
});

mongoose.connection.on('connected', function(){console.log('funciona db');});
mongoose.connection.on('error', function(e){console.log('no funciona db', e);});
mongoose.connection.on('disconnected', function(){console.log('desconectat de la db');});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});


app.listen(3000, () =>{
    console.log('app now listening for requests on port 3000');
});