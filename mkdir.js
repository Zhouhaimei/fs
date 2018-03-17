let fs = require('fs');
function makep(dir){
    let arr = dir.split('/');
    function next(index){
        if(index>=arr.length)return 
        let p = arr.slice(0,index).join('/');
        fs.access(p,fs.constants.R_OK,function(err){
            if(err){ // 不存在
                fs.mkdir(p,()=>next(index+1))
            }else{
                next(index+1);
            }
        })
    }
    next(1);
}
makep('a/e/f/f/a/w');
// function makep(dir){
//     let arr = dir.split('/');
//     for(var i = 0;i<arr.length;i++){
//         let filePath =  arr.slice(0,index++).join('/');
//         try{
//             fs.accessSync(filePath,fs.constants.R_OK)
//         }catch(e){
//             fs.mkdirSync(filePath)
//         }
//     }
// }
// makep('a/b/c/d')