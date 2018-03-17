let fs = require('fs');
let path = require('path');
function removeDir(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,function(err,stat){
            if(stat.isDirectory()){
                fs.readdir(dir,function(err,files){
                    // 如果是目录  对目录进行转化程promise 继续删除
                    Promise.all(files.map(item=>removeDir(path.join(dir,item)))).then(function(){
                        fs.rmdir(dir,resolve)
                    });
                })
            }else{
                fs.unlink(dir,resolve)
            }
        })
       
    });
}

removeDir('a');