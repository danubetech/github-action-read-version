const readVersionMaven = () => {
    const fs = require("fs")
    const pom = fs.readFileSync('/github/workspace/pom.xml')
    const parseString = require('xml2js').parseString;

    let parsedPom = '';
    parseString(pom, (err, result) => {
        if (err) {
            throw err;
        }
        parsedPom = result;
    })

    const version = parsedPom.project.version[0];
    if (version === '') {
        throw new Error('Version is empty');
    }
    return version;
}

const core = require('@actions/core');
const framework = core.getInput('framework', { trimWhitespace: true, required: true });

let version = ''
switch (framework) {
    case 'maven':
        version = readVersionMaven();
        break;
    case 'node':
    case 'nodejs':
        const packageJson = require('/github/workspace/package.json');
        version = packageJson.version;
        break;
    default:
        throw Error(`Framework ${framework} not supported`)
}

console.log(`Setting version ${version} as output`);
core.setOutput('version', version)