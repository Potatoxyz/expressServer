"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
//接受上传文件用的
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
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
app.post('/upload', multipartMiddleware, function (req, res) {
    console.log(req.body, req.files);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.type('json');
    res.send({ result: '收到' });
    res.end();
    // don't forget to delete all req.files when done
});
app.get('/pda', function (req, res, next) {
    console.log(req.query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.jsonp(pdaData);
});
app.listen(8081, function () {
    console.log("服务已启动");
});
function getData(currentPage, pageSize) {
    if (currentPage == 1 && pageSize == 5) {
        console.log('page1');
        var rData = [];
        for (var i = 0; i < 5; i++) {
            rData.push(data[i]);
        }
        return rData;
    }
    if (currentPage == 2 && pageSize == 5) {
        console.log('page2');
        var rdata = [];
        for (var i = 5; i < 8; i++) {
            rdata.push(data[i]);
        }
        return rdata;
    }
}
var chartData = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    {
        name: 'Chrome',
        y: 12.8,
        sliced: true,
        selected: true
    },
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['其他', 0.7]
];
var data = [
    {
        packageNum: 'jSTD39600',
        TraceNum: 'STD852369741258963258',
        LogisticsWay: 'Quickway重货-Quickway',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    }
];
var pdaData = [
    {
        Cname: "看似简单福克斯的解放碑你快睡觉都不分开不是地方",
        pknum: "sdfasdfasdfsdfgdfg564654",
        skucode: "bbbbbbsdfqa",
        stpalce: "SDFSDFG-654654",
        total: "1000",
    },
    {
        Cname: "这是地方工作是豆腐干豆腐干反对恢复对话的风格和法国",
        pknum: "eghyrthdrhdyrjtjtj9879888",
        skucode: "bbbbbbsdfqa",
        stpalce: "SDFSDFG-654654",
        total: "2000",
    },
    {
        Cname: "啊俄方热管散热钛合金体育节目喝咖啡与人沟通",
        pknum: "erythhmjcvbzdsfg6666666",
        skucode: "bbbbbbsdfqa",
        stpalce: "SDFSDFG-654654",
        total: "3000",
    },
];
//# sourceMappingURL=server.js.map