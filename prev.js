let fs = require('fs');
let path = require('path');
function preDeep(dir,callback){
    console.log(dir);
    fs.readdir(dir,function(err,files){
        function next(index){
            if(index === files.length) return callback();
            let file = files[index]
            let p = path.join(dir,file);
            fs.stat(p,function(err,stat){
                if(stat.isDirectory()){
                    preDeep(p,()=>next(index+1));
                }else{
                    next(index+1)
                }
            })
        }
        next(0);
    })
}
preDeep('a',function(){
    console.log('ok')
});

// function preDeep(dir){
//     console.log(dir)
//     let files = fs.readdirSync(dir);
//     files.forEach(function(file){
//         let p = path.join(dir,file);
//         let stat = fs.statSync(p);
//             if(stat.isDirectory()){
//                 preDeep(p);
//             }else{
//                 console.log(dir);
//             }
//     });
// }
// preDeep('a');
