if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');

// for encrypted passwords
const bcrypt = require('bcrypt');

// express
const app = express();
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');

// now we have the passport
initializePassport(
    passport,
    email => USERS.find(user => user.email === email)
);

// all logged USERS
const USERS = [];


// import static folders
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use('/img', express.static('img'));
app.use('/webfonts', express.static('webfonts'));

// set default ejs template
app.set('view-engine', 'ejs');

// for form fields
app.use(express.urlencoded({extended: false}));

// setting up the passport
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req, res) => {
    res.render('login.ejs', {name: 'Kyle'})
})

app.get('/success', (req, res) => {
    res.render('success.ejs');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', (req, res) => {
    res.render('register.ejs')
})


app.post('/register', async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        USERS.push({
            id:Date.now().toString,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch {
        res.redirect('/register')
    }

    console.log(USERS);
});



//////////////////////////////////////////////
app.listen(3000);

