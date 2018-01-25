import * as express from 'express';
const app = express();
var bodyParser = require('body-parser');
app.use(express.static("html")).listen(8080,()=>{
    console.log("服务已启动");
});
//app.use(bodyParser.urlencoded({extended :true}));//POST接受表单类型数据
app.use(bodyParser.json());//POST接受Json类型数据
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS")
    {res.status(200).send('');}/*让options请求快速返回*/
    else  {next()}
});
app.get('/', (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8','Access-Control-Allow-Origin':'*'});
        response.redirect('../html/index.html');
    }
);
app.post('/login',(req,res)=>{
    console.log(req.body);
    res.jsonp(userData);
});
let userData=[
    {user:'admin',password:'123123'},
    {user:'test1',password:'456456'},
];