var index=require('./index');
exports.GetRoutes=function(app){
    app.get('/', index.index);
    app.get('/test', index.test);
    app.get('/RedisTest',index.RedisTest) ;
}
