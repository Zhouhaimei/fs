let fs = require('fs');
const BUFFER_SIZE = 3;
function copy(source, target) {
    let buffer = Buffer.alloc(BUFFER_SIZE)
    fs.open(source, 'r', 0o666, function (err, rfd) {
        fs.open(target, 'w', 0o666, function (err, wfd) {
            function next() {
                fs.read(rfd, buffer, 0, BUFFER_SIZE, null, function (err, bytesRead) {
                    if (bytesRead > 0) {
                        fs.write(wfd, buffer, 0, bytesRead, null, function (err, bytesWritten) {
                            next();
                        });
                    }
                })
            }
            next();

        });
    });
}
copy('1.txt', '2.txt')

