let fs = require('fs');
let path = require('path');
// 广度遍历 异步
function wide(dir){
    let arr = [dir];
    let index = 0;
    function rmdir(){
        let a = arr.pop();
        if(a){
            fs.stat(a,function(err,stat){
                if(stat.isDirectory()){
                    fs.rmdir(a,rmdir);
                }else{
                    fs.unlink(a,rmdir)
                }
            })
        }
        
    }
    !function next(){
        if(index === arr.length){
            return rmdir();
           // return 
        }
        let current = arr[index++];
        fs.stat(current,function(err,stat){
            if(stat.isDirectory()){
                fs.readdir(current,function(err,files){
                    let dir = files.map(file=>path.join(current,file));
                    arr = [...arr,...dir]; // 所有的路径
                    next();
                });
            }else{
                next();
            }
        })
    }()
}
wide('a');

// 广度遍历 同步
// function wide(dir){
//     console.log(dir);
//     let arr = [dir];
//     while(arr.length>0){
//         let a = arr.shift();
//         let files = fs.readdirSync(a);
//         files.forEach(file=>{ // file就是文件
//             let p = path.join(a,file);
//             let stat = fs.statSync(p);
//             console.log(p);
//             if(stat.isDirectory()){
//                 // 是目录放到数组中
//                 arr.push(p);
//             }
//         });
//     }
// }
// wide('a')






let fs = require('fs');
let path = require('path');
function wide(dir, cb) {
    console.log(dir);
    cb && cb()
    fs.readdir(dir, (err, files) => {
        !function next(i){
            if(i>= files.length) return;
            let child = path.join(dir,files[i]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    wide(child, () => next(i+1));
                } else {
                    console.log(child);
                    next(i+1);
                }
            })
        }(0);
    })
}
wide('a');





