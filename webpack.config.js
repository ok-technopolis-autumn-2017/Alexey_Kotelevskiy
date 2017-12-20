/**
 * Created by Алексей on 20.12.2017.
 */
const path = require('path');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist/scripts')
    }
};