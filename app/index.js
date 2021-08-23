const fs = require("fs")

const pom = fs.readFileSync('/github/workspace/pom.xml')
console.log('### Raw Pom', pom);

const parseString = require('xml2js').parseString;

parseString(pom, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('### Result', result);
    console.log(result.project.version[0]);
})