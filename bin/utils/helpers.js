const fs = require('fs');
const path = require('path');
let postcss = require('postcss');
let autoprefixer = require('autoprefixer');
let purgecss = require('@fullhuman/postcss-purgecss');
let cssnano = require('cssnano');
const sass = require('sass');
require('dotenv').config();

const transpileCss = async (file, outputFile = undefined) => {
    const loadPath = path.join(process.cwd(), process.env.LOAD_PATH);
    const transpiledCss = sass.compile(file, {
        loadPaths: [loadPath]
    });
    let result;
    if (process.env.NODE_ENV === 'production') {
        result = await postcss([
            autoprefixer,
            cssnano({ safe: true }),
            purgecss({
                content: ['**/*.ts', '**/*.tsx', '**/*.mdx', '**/*.svg', './remix.config.js'],
                css: ['**/*.css'],
                safelist: {
                    greedy: [/\b\w*react-datepicker\w*\b/i]
                },
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                variables: false
            })
        ]).process(transpiledCss.css, {
            to: file.replace('.scss', '.css'),
            from: undefined
        });
    } else {
        result = await postcss([autoprefixer]).process(transpiledCss.css, {
            to: file.replace('.scss', '.css'),
            from: undefined
        });
    }

    if (outputFile === undefined) {
        fs.writeFileSync(file.replace('.scss', '.css'), result.css);
        console.log('-- created: ', file.replace('.scss', '.css'));
    } else {
        mkDirByPathSync(path.dirname(outputFile));
        fs.writeFileSync(outputFile, result.css);
        console.log('-- created: ', file.replace('.scss', '.css'));
    }
};

function mkDirByPathSync(targetDir) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
}

module.exports = transpileCss;
