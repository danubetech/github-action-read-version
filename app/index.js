const fs = require("fs")

const pom = fs.readFileSync('/github/workspace/pom.xml')

const parseString = require('xml2js').parseString;
const core = require('@actions/core');

parseString(pom, (err, result) => {
    if (err) {
        throw err;
    }
    const version = result.project.version[0];

    if (version === '') {
        throw new Error('Version is empty');
    }

    console.log(`Setting version ${version} as output`);
    core.setOutput('version', version)
    core.exportVariable('envVersion', version);
})