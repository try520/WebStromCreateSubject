var index=require('./index');

exports.GetRoutes=function(app){
    app.get('/User', index.index);
}
