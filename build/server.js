"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
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
app.listen("8080", function () {
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
    },
    {
        packageNum: 'jSTD22222',
        TraceNum: 'STD222222222222',
        LogisticsWay: 'Quickway重货-Quickway',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD33333',
        TraceNum: 'STD333333333333333',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD44444',
        TraceNum: 'STD4444444444444',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD55555',
        TraceNum: 'STD555555555555555',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD66666666',
        TraceNum: 'STD66666666666',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD777777777',
        TraceNum: 'STD7777777777777',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
    {
        packageNum: 'jSTD88888',
        TraceNum: 'STD88888888888',
        LogisticsWay: '顺丰国际电商快递-顺丰欧洲小包',
        DeliverTime: '2017-12-5 17:05:32',
        OnlineTime: '2017-12-5 17:05:32',
        GetTime: '2017-12-5 17:05:32',
        NewInfo: '无',
        packageStatu: '待上网'
    },
];
//# sourceMappingURL=server.js.map