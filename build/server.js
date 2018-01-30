"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
//接受上传文件用的
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var path = require('path');
//接受上传的文件并存储
var multiparty = require('multiparty');
//文件操作
var fs = require("fs");
//解析请求体
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") {
        res.status(200).send('');
    } /*让options请求快速返回*/
    else {
        next();
    }
});
app.get('/', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    response.end("这是首页");
});
app.get('/jsonp', function (req, res, next) {
    var CurrentPage = req.query.CurrentPage;
    var PageSize = req.query.PageSize;
    // console.log(CurrentPage);
    // console.log(PageSize);
    if (CurrentPage != undefined && PageSize != undefined) {
        res.jsonp(getData(CurrentPage, PageSize));
    }
    else {
        res.jsonp(data);
    }
});
app.get('/charts', function (req, res, next) {
    res.jsonp(data);
});
app.get('/filesList', function (req, res) {
    res.send(fileList);
    res.end();
});
app.post('/addfile', function (req, res) {
    res.send('添加');
    console.log(req.body);
    res.end();
});
app.post('/deletefile', function (req, res) {
    res.send('删除');
    console.log(req.body);
    res.end();
});
app.post('/editfile', function (req, res) {
    console.log(req.body.beforetext);
    for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].filename == req.body.beforetext) {
            fileList[i].filename = req.body.aftertext;
        }
    }
    res.send('修改成功');
    res.end();
});
app.post('/upload', function (req, res) {
    //console.log(path.resolve(__dirname,'get-upload'));
    var form = new multiparty.Form({ uploadDir: path.resolve(__dirname, '../upload') });
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        //console.log(files);
        //分两种情况，一: 单个提交方式二：formData提交即全部提交
        if (files.file) {
            for (var i = 0; i < files.file.length; i++) {
                fs.renameSync(files.file[i].path, 'upload/' + files.file[i].originalFilename);
            }
            console.log('single');
        }
        else {
            for (var key in files) {
                //console.log(files[key][0].path);
                fs.renameSync(files[key][0].path, 'upload/' + files[key][0].originalFilename);
            }
            console.log('all');
        }
    });
    res.type('json');
    res.send({ result: '收到' });
    res.end();
    // don't forget to delete all req.files when done
});
app.get('/pda', function (req, res, next) {
    console.log(req.query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.jsonp();
});
app.listen(8081, function () {
    console.log("服务已启动");
});
function getData(CurrentPage, PageSize) {
}
var data = [];
var fileList = [
    { filename: '默认文件夹', subfiles: ['666.jpg', '7777.jpg'] },
    { filename: 'test1', subfiles: ['xxx.jpg', 'yyyy.jpg'] },
];
var fileModal = (function () {
    function fileModal() {
    }
    return fileModal;
}());
exports.fileModal = fileModal;
//# sourceMappingURL=server.js.map