let fs = require('fs');
let path = require('path');
// 先序深度 异步
function preDeep(dir,callback){ // dir是目录
    fs.readdir(dir,function(err,files){
        //files 代表所有文件
        !function next(index){
            if(index === files.length){
                return fs.rmdir(dir,function(err){
                    callback&&callback()
                })
            }
            let filePath = path.join(dir,files[index]);
            fs.stat(filePath,function(err,stat){
                if(stat.isDirectory()){ // 如果是文件夹
                    preDeep(filePath,()=>next(index+1));
                }else{
                    fs.unlink(filePath,function(){
                        next(index+1);
                    })
                }
            });
        }(0)
    })
}
preDeep('a',function(){
    console.log('ok')
});




// 先序深度 同步
// function preDeep(dir){
//     console.log(dir);
//     let files = fs.readdirSync(dir);
//     files.forEach(file=>{ 
//         let p = path.join(dir,file);
//         let stat = fs.statSync(p);
//         if(stat.isDirectory()){
//             preDeep(p);
//         }else{
//             console.log(p);
//         }
//     });
// }
// preDeep('a');


