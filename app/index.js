const fs = require("fs")

const pom = fs.readFileSync('/github/workspace/pom.xml')

const parseString = require('xml2js').parseString;

parseString(pom, (err, result) => {
    if (err) {
        throw err;
    }
    const version = result.project.version[0];
    console.log(`Setting version ${version} as GLOBAL_TAG`);
    process.env.GLOBAL_TAG = version;
    console.log('process envs', process.env)
})