import * as express from 'express';

const app = express();
//接受上传文件用的
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var path=require('path');

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

app.use('/static', express.static(path.resolve(__dirname,'../upload/')));


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
        response.end("这是首页")
    }
);
app.get('/jsonp',  (req, res, next) =>{
    let CurrentPage=req.query.CurrentPage;
    let PageSize=req.query.PageSize;
    // console.log(CurrentPage);
    // console.log(PageSize);
    if(CurrentPage!=undefined&&PageSize!=undefined){
        res.jsonp(getData(CurrentPage,PageSize));
    }
    else{
        res.jsonp(data);
    }
});
app.get('/charts',  (req, res, next) =>{
    res.jsonp(data);
});


//获取文件夹及子文件名
app.get('/filesList',(req, res) =>{
    //读取本地文件
    let fileArray=fs.readdirSync(path.resolve(__dirname,'../upload'));
    let filelist:Array<fileModel>=[];
    for(let i=0;i<fileArray.length;i++){
        try {
            var isdir=fs.lstatSync(path.resolve(__dirname,'../upload/'+fileArray[i])).isDirectory();
            //console.log(isdir);
            if(isdir){
                var subfilename=fs.readdirSync(path.resolve(__dirname,'../upload/'+fileArray[i]));
                filelist.push({filename:fileArray[i],subfiles:subfilename})
            }
        }
        catch (err){
            console.log(err);
        }

    }
    //console.log(filelist);
    res.send(filelist);
    res.end();
});
//添加文件夹
app.post('/addfile',(req, res) =>{
    console.log(req.body.filename);
    let filename=req.body.filename;
    let exist=fs.existsSync(path.resolve(__dirname,'../upload/'+filename));
    if(!exist){
        fs.mkdirSync(path.resolve(__dirname,'../upload/'+filename));
        res.send('添加成功');
    }
    else{
        res.end('文件夹已经存在');
    }
});
//删除文件夹
app.post('/deletefile',(req, res) =>{
    var targetFileName=req.body;
    var result;
    var delsubfiles=function (dir,subfiles,delDir) {
        subfiles.forEach(value1=>{
            fs.unlinkSync(path.resolve(__dirname,`../upload/${dir}/${value1}`));
        });
        delDir(dir);
    };
    var deldir=function (dir) {
        fs.rmdirSync(path.resolve(__dirname,'../upload/'+dir));
    };
    try{
        for(let key in targetFileName){
            var arr=key.split(',');
            arr.forEach((value)=>{
                console.log(value);
                fs.readdir(path.resolve(__dirname,'../upload/'+value),(err, files)=>{
                    //是否是空文件夹,如果是，先删除子文件
                    if(files){
                        delsubfiles(value,files,deldir);
                        // files.forEach(value1=>{
                        //     fs.unlinkSync(path.resolve(__dirname,`../upload/${value}/${value1}`));
                        // })
                    }
                    else{
                        deldir(value);
                        //fs.rmdirSync(path.resolve(__dirname,'../upload/'+value));
                    }
                });
            })
        }
        result={result:true,message:'删除成功'};
        res.send(result);
        res.end();
    }
    catch (err){
        console.log(err);
        result={result:false,message:'删除失败'};
        res.send(result);
        res.end();
    }

});
//编辑文件夹
app.post('/editfile',(req, res) =>{
    //console.log(req.body);
    let beforetext=req.body.beforetext;
    let aftertext=req.body.aftertext;
    //要修改的文件夹存在，修改之后不能同名
    let exist=fs.existsSync(path.resolve(__dirname,'../upload/'+beforetext));
    if(!exist){
        res.send('文件不存在');
    }
    else{
        try{
            fs.renameSync(path.resolve(__dirname,'../upload/'+beforetext),path.resolve(__dirname,'../upload/'+aftertext));
            res.send('修改成功');
        }
        catch (err){
            if(err){
                //console.log(err);
                res.send('修改失败');
            }
        }

    }
    res.end();
});
let targetFile:string='';
//上传图片之前先验证文件夹
app.post('/targetFile',(req, res) =>{
    targetFile=req.body.targetFile;
    let targetfilePath=path.resolve(__dirname,'../upload/'+targetFile);
    var result={result:true,message:'要保存到的目录:'+targetFile};
    //判断文件夹是否存在
    if(!fs.existsSync(targetfilePath)){
        fs.mkdirSync(targetfilePath);
        result={result:true,message:'文件夹不存在，新建文件夹'};
    }
    res.send(result);
    res.end();
});
//上传图片
app.post('/upload', function(req, res) {
    //console.log(path.resolve(__dirname,'get-upload'));
    var form = new multiparty.Form({uploadDir:path.resolve(__dirname,'../upload/')});
    var result;
    form.parse(req, function(err, fields, files) {
        if(err){
            console.log(err);
        }
        //分两种情况，一: 单个提交方式二：formData提交即全部提交
        if(files.file){
            console.log('single');
            try {
                fs.renameSync(files.file[0].path,path.resolve(__dirname,'../upload/'+targetFile+'/'+files.file[0].originalFilename));
                result={result:true,message:'上传成功'};
                console.log('单个提交上传成功');
                res.send(result);
                res.end();
            }
            catch (err){
                result={result:false,message:err};
                console.log(err);
                res.send(result);
                res.end();
            }
        }
        else{
            console.log('all');
            try{
                for(var key in files){
                    //console.log(files[key][0].path);
                    fs.renameSync(files[key][0].path,path.resolve(__dirname,'../upload/'+targetFile+'/'+files[key][0].originalFilename));
                }
                result={result:true,message:'上传成功'};
                console.log('all提交上传成功');
                res.send(result);
                res.end();
            }
            catch (err){
                result={result:false,message:'上传失败'};
                console.log(err);
                res.send(result);
                res.end();
            }
        }
    });
    res.type('json');

    // don't forget to delete all req.files when done
});
//获取图片,两种方法，一是生成url地址,可以缓存，二是生成base64,不能缓存
app.get('/getPic', function(req, res){
    var targetfile=req.query.data;
    //console.log(req.query);
    if(targetfile){
        try{
            fs.readdir(path.resolve(__dirname,'../upload/'+targetfile),(err,files)=>{
                if(files){
                    var urls=[];
                    files.forEach((value)=>{
                        urls.push(`http://172.20.1.146:8081/static/${targetfile}/${value}`);
                    });
                    res.send({result:true,message:'文件获取成功',data:urls});
                    res.end();
                }
            })
        }catch (err){
            console.log(err);
            console.log('读取失败');
            res.type('json');
            res.send({result:false,message:'文件获取失败'});
            res.end();
        }
    }
    else{
        res.send({result:false,message:'文件获取失败'});
        res.end();
    }
});

app.get('/pda',  (req, res, next) =>{
    console.log(req.query);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.jsonp();


});

app.listen(8081,() => {
    console.log("服务已启动")
});
function getData(CurrentPage,PageSize){

}
let data=[];
// let fileList:Array<fileModel>=[
//     {filename:'默认文件夹',subfiles:['666.jpg','7777.jpg']},
//     {filename:'test1',subfiles:['xxx.jpg','yyyy.jpg']},
// ];
export class fileModel{
    filename:string;
    subfiles:string[];
}
