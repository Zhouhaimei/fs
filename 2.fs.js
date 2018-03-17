
let fs = require('fs');

// 0标准输入  1标准输出
process.stdin.on('data',function(data){
    console.log(data);
})  
let fs = require('fs');
fs.open('./2.txt','w',0o666,function(err,fd){
    console.log('11',fd)
    fs.write(fd,Buffer.from('a'),0,1,3,function(err,byteWritten){
        fs.fsync(fd,function(){
            fs.close(fd,function(){
                console.log('关闭')
            })
        })
    })
})
setTimeout(function(){
    fs.open('./2.txt','w',0o666,function(err,fd){
        console.log(fd)
    })
},100)

let fs = require('fs');
fs.mkdir('a/b',function(err){
    console.log(err)
})
let fs = require('fs');
fs.access('a',fs.constants.R_OK,function(err){
    console.log(err)
})

// 递归异步创建目录

let fs = require('fs');
function mkdirp(dir){ // [a,b,c]
    let paths  = dir.split('/'); 
    function next(index){
        if(index>paths.length)return
        let dir = paths.slice(0,index).join('/');
        fs.access(dir,fs.constants.R_OK,function(err){
            if(err){
                fs.mkdir(dir,function(err){
                    next(index+1);
                });
            }else{
                next(index+1)
            }
        })
    }
    next(1);
}
mkdirp('a/b/c');



//  同步删除目录
let fs = require('fs');
function removeSync(dir){
    try{
        let flag =fs.accessSync(dir,fs.constants.R_OK);
        let dirs = fs.readdirSync(dir);
        dirs.forEach(function(d){
            let p = require('path').join(dir,d);
            let stat = fs.statSync(p);
            console.log(stat.isDirectory())
            if(stat.isDirectory()){ // 如果是目录
                removeSync(p);
            }else{
                fs.unlinkSync(p);
            }
        });
        fs.rmdirSync(dir);
    }catch(e){
        console.log(e)
    }
    
}
removeSync('a');


let fs = require('fs');
let iconvLite = require('iconv-lite');
let result = fs.readFileSync('./3.txt');
result = iconvLite.decode(result,'gbk')
console.log(result)


let fs = require('fs');
fs.readdir('./a',function(err,files){
    console.log(files);
})


// 文件操作的方法
let fs = require('fs');

fs.rename('1.txt','10.txt');


let fs = require('fs');
fs.truncate('./10.txt',5,()=>{
    console.log('截断')
})

