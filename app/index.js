const incrementMajorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = parseInt(splitString[0]) + 1;
    return `${majorVersion}.0.0`;
}

const incrementMinorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = splitString[0];
    const minorVersion = splitString[1].split('-')[0];
    return `${majorVersion}.${minorVersion}.0`;
}

const incrementPatchVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = splitString[0];
    const minorVersion = splitString[1].split('-')[0];

    let patchVersion;
    if (splitString.length === 2) {
        patchVersion = 1;
    } else {
        patchVersion = splitString[2].split('-')[0];
    }

    return `${majorVersion}.${minorVersion}.${patchVersion}`;
}

const readVersionMaven = (versionCore) => {
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

    const parsedVersion = parsedPom.project.version[0];
    if (parsedVersion === '') {
        throw new Error('Parsed Version is empty');
    }

    switch (versionCore) {
        case 'major':
            return incrementMajorVersion(parsedVersion);
        case 'minor':
            return incrementMinorVersion(parsedVersion);
        case 'patch':
            return incrementPatchVersion(parsedVersion);
    }
}

const core = require('@actions/core');
const framework = core.getInput('framework', { trimWhitespace: true, required: true });
const versionCore = core.getInput('version-core', { trimWhitespace: true, required: true });

let version = ''
switch (framework) {
    case 'maven':
        version = readVersionMaven(versionCore);
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