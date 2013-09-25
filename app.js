
/**
 * Module dependencies.
 */

var express = require('express');
var ejs=   require('ejs');
var http = require('http');
var path = require('path');
var fs = require('fs');

var UserRoutes = require('./routes/User/route');
var HomeRoutes=require('./routes/home/route');

var app = express();

// all environments

app.set('port', process.env.PORT || 3001);
app.set('User', __dirname + '/views');
app.set('view engine', 'ejs');
  /*日志*/
var accessLogfile = fs.createWriteStream('./Log/access.log', {flags: 'a'});
app.use(express.logger({stream: accessLogfile}));
//错误日志
var errorLogfile = fs.createWriteStream('./Log/error.log', {flags: 'a'});
app.configure('production', function(){
    app.error(function (err, req, res, next) {
        var meta = '[' + new Date() + '] ' + req.url + '\n';
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));

/*运行模式*/
NODE_ENV="production";
NODE_ENV="development";

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

 /*设置模块路由信息*/
HomeRoutes.GetRoutes(app);  //首页路由
UserRoutes.GetRoutes(app);    //User模块路由

var listen=function(){
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}

if (!module.parent){
    listen();
}
exports.listen=listen;


