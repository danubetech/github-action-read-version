const fs = require("fs")

const pom = fs.readFileSync('/github/workspace/pom.xml')

const parseString = require('xml2js').parseString;

parseString(pom, (err, result) => {
    if (err) {
        throw err;
    }
    const version = result.project.version[0];
    console.log('Setting version as GLOBAL_TAG: ', version);
    process.env.GLOBAL_TAG = version;
})