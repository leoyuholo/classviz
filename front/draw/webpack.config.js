const path = require('path');

module.exports = {
    entry: './drawcover.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'draw.js'
    }  
};