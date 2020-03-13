const path = require('path');

module.exports = {
    entry: './eventloader.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'collect.js'
    }
}; 