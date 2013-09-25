/*
 * GET home page.
 */

exports.index = function ( req , res ) {
    var redis = require ( 'redis' );
    var RedisClient = redis.createClient ( '6379' , '127.0.0.1' );
    RedisClient.on ( "error" , function ( err ) {
        console.log ( "Error " + err );
        res.render ( 'home/index' , { title : 'Content Redis Error' } );

    } );
    RedisClient.on ( 'connect' , function () {
        res.render ( 'home/index' , { title : 'Content Redis Success' } );
    } );
    RedisClient.quit ();

};

exports.test = function ( req , res ) {
    //神奇的闭包
    //闭包需要2步：
    // 第一步：构造一个函数，用于返回内部的一个函数
    var generateClosure = function () {
        var count = 0;
        var get = function () {
            count ++;
            return count;
        };
        return get;
    };
    //第二步：将内部函数已经内部函数的定义环境赋值给另外一个变量
    var counter1 = generateClosure ();
    var counter2 = generateClosure ();
    console.log ( counter1 () ); // 输出 1
    console.log ( counter2 () ); // 输出 1
    console.log ( counter1 () ); // 输出 2
    console.log ( counter1 () ); // 输出 3
    console.log ( counter2 () ); // 输出 2
    console.log ( counter2 () ); // 输出 3
    res.send ( "ok" );
}

exports.RedisTest = function ( req , res ) {
    var Redis=require("MyRedis");
    var Model={};
    Model.title="这是一个测试";
    Model.content="这是内容";
    Redis.GetClient(function(err , Client){
        Client.hset("urn:Data:Test:Data:3","key1" ,JSON.stringify(Model),function(err){
              console.log(err);
            res.render ( 'home/index' , Model );
        })
    })





}