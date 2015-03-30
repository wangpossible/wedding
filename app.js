//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG

var express = require('express');
var http=require('http');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var markdown = require('markdown-js');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var wedding = require('./routes/wedding');

var setting = {cookieSecret:"TYUIOHNJF",db:"users"}; 

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
    secret:setting.cookieSecret, 
    key:setting.db, 
    cookie:{maxAge:1000*60*60*24*30}
    //store:new MongoStore({db:setting.db}) 
}));

app.use(express.static(path.join(__dirname, 'public')));

//add markdown support
app.engine('md', function(path, options, fn){  
  fs.readFile(path, 'utf8', function(err, str){  
    if (err) return fn(err);  
    str = markdown.parse(str).toString();  
    fn(null, str);  
  });  
});

//route config
app.use('/', routes);
app.use('/users', users);
app.use('/events', events);
app.use('/wedding', wedding);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;