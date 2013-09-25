/*
 * GET home page.
 */
var NewPromotion = require('NewPromotion');

exports.index = function (req, res) {
    var EventEmitter = require('events').EventEmitter;
    var event=new  EventEmitter();

    var SiteUser = NewPromotion.SiteUser;
    var Model = SiteUser.Model();
    SiteUser.Access.Select(15, function (err, Resout) {
        if (err) {
            console.log(err);
        }
        Model = Resout;
        event.emit('ModelIsRead');

    })

    event.on("ModelIsRead",function(){
        SiteUser.Access.SelectAll(function (err, Rows) {
            if (err) {
                res.render('user/User', { title: "查询数据库失败" });
            } else {

                var model = {};
                model.title = "查询成功";
                model.Data = Rows;
                model.CurModel = Model;
                res.render('user/User', model);

            }
        })
    })


};