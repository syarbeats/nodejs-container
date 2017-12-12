var util = require('./middleware/utilities');
var partials = require('express-partials');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var errorHandlers = require('./middleware/errorhandlers');

var log = require('./middleware/log');
var routes = require('./routes');
var order_route = require('./routes/order_processing');
var redis   = require("redis");
var client  = redis.createClient();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');
var flash = require('connect-flash');
var config = require('./config');

/*client.auth('Diah!)@(*', function (err) {
    if(err) throw err;
});*/

client.on("error", function (err) {
    console.log("Error CHoy: " + err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cookieParser(config.secret));
app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({host: config.redisServer.host, port: config.redisServer.port, client: client})
}));



app.use(csrf({cookie:{key:'XSRF-TOKEN',path:'/'}}));
app.use(util.csrf);
app.use(util.authenticated);

app.use(partials());
app.use(log.logger);
app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});
app.use(express.static(__dirname + '/static'));

//app.use(session({secret: 'secret'}));
app.use(flash());
app.use(util.templateRoutes);

app.get('/', routes.login);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get('/chat', [util.requireAuthentication], routes.chat);
app.get(config.routes.logout, routes.logOut);
//app.get('/chat', routes.chat);
app.get('/order', order_route.order_processing);
app.get('/error', function (req, res, next) {
    next(new Error('A Contrived Error'));
});

app.use(errorHandlers.notFound);


app.listen(config.port);
console.log("App server running on port 3000");
