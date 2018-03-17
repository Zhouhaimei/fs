let fs = require('fs');
let path = require('path');
function removeDir(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,function(err,stat){
            if(stat.isDirectory()){
                fs.readdir(dir,function(err,dirs){
                    let list = dirs.map(item=>removeDir(path.join(dir,item)))
                    Promise.all(list).then(function(){
                        fs.rmdir(dir,resolve);
                    })
                })
            }else{
                fs.unlink(dir,resolve);     
            }
        });
    });
}
removeDir('a').then(function(){
    console.log('成功')
});