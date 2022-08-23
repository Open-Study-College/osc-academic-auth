let nodemon = require('nodemon');
const transpileCss = require('./utils/helpers');
const path = require('path');
require('dotenv').config();

// foreach file ending with .scss
// run transpileCss
// output to new css file

nodemon({
    port: 3001,
    ext: 'scss',
    ignore: ['.git', 'node_modules/**/node_modules']
}).on('restart', (files) => {
    /// process files

    files?.forEach((file) => {
        if (file.includes(process.env.LOAD_PATH)) {
            transpileCss(
                path.join(process.cwd(), process.env.PATH_TO_MAIN_SCSS),
                path.join(process.cwd(), process.env.PATH_TO_DEST_MAIN_CSS)
            );
        } else {
            transpileCss(file);
        }
    });
});
