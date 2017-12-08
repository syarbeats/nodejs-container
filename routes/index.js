var util = require('../middleware/utilities');
var config = require('../config');

module.exports.index = index;
module.exports.logOut = logOut;
module.exports.loginProcess = loginProcess;


function index(req, res){
    //res.send('Index');
    //res.render('index', {title: 'Index'});
   // res.render('index', {layout: 'layout', title: 'Index'});
   // res.render('index', {title: 'Index', cookie: JSON.stringify(req.cookies)});
    res.cookie('IndexCookie', 'This was set from Index');
    res.render('index', {title: 'Index', cookie: JSON.stringify(req.cookies), session: JSON.stringify(req.session), signedCookie: JSON.stringify(req.signedCookies)});
    /*res.render('index', {title: 'Index',
        cookie: JSON.stringify(req.cookies),
        session: JSON.stringify(req.session),
        signedCookie: JSON.stringify(req.signedCookies)});*/
};

exports.login = function login(req, res){
    //res.render('login', {title: 'Login'});

    //res.render('login', {layout: 'layout', title: 'Login'});
    res.render('login', {title: 'Login', message: req.flash('error')});
};
exports.chat = function chat(req, res){
    //res.render('chat', {title: 'Chat'});
    res.render('chat', {layout: 'layout', title: 'Chat'});
};

function loginProcess(req, res) {
    //res.redirect('/');
    console.log(req.body);
    //res.send(req.body.username + ' ' + req.body.password);
    var isAuth = util.auth(req.body.username, req.body.password, req.session);

    if (isAuth) {
        res.redirect('/chat');
    }else {
        req.flash('error', 'Wrong Username or Password');
        res.redirect(config.routes.login);
    }
};

function logOut(req, res){
    util.logOut(req.session);
    res.redirect('/');
};
