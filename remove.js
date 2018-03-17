let fs = require('fs');
let path = require('path');

function removeDir(dir) {
    return new Promise(function (resolve, reject) {
        fs.stat(dir, function (err, stat) {
            if (stat.isDirectory()) {
                fs.readdir(dir, function (err, files) {
                    Promise.all(files.map(file => removeDir(path.join(dir,file)))).then(function () {
                        fs.rmdir(dir,resolve);
                    })
                });
            } else {
                fs.unlink(dir, resolve)
            }
        })
    })
}
removeDir('a').then(function(){
    console.log('ok')
});


// function removeDir(dir){
//     // 删除a目录下的内容
//     let files = fs.readdirSync(dir);
//     files.forEach(function(file){
//         let p = path.join(dir,file);
//         let stat = fs.statSync(p)
//         if(stat.isDirectory()){ // 如果是目录
//             removeDir(p);
//         }else{ // 
//             fs.unlinkSync(p)
//         }
//     });
//     fs.rmdirSync(dir);
// }
// removeDir('a');