const sass = require('sass');
const fs = require("node:fs")


const result = sass.compile("../snowflakes.scss");
fs.writeFile("../snowflakes.css", result.css, function (err) {
    if (err) {
        throw err;
    }
    console.log('Saved!');
})
