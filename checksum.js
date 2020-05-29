var fs = require('fs');
var crypto = require('crypto');


function generateChecksum(str, algorithm, encoding) {
    return crypto
        // .createHash(algorithm || 'md5')
        .createHash(algorithm || 'sha256')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

module.exports = (filename) => {
    var data = fs.readFileSync(filename);
    return generateChecksum(data);
}


