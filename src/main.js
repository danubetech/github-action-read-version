const core = require('@actions/core');
const fs = require('fs');
const { readVersionMaven } = require("./readVersionMaven");
const { readVersionNode } = require("./readVersionNode");

const framework = core.getInput('framework', { trimWhitespace: true, required: true });
const versionCore = core.getInput('version-core', { trimWhitespace: true, required: true });

let versions;
switch (framework) {
    case 'maven':
        versions = readVersionMaven(versionCore);
        break;
    case 'node':
    case 'nodejs':
        const packageJson = require('/github/workspace/package.json');
        versions = readVersionNode(packageJson.version, versionCore);
        break;
    default:
        throw Error(`Framework ${framework} not supported`);
}

console.log(`Setting releaseVersion ${versions.releaseVersion} as output`);
core.setOutput('releaseVersion', versions.releaseVersion);
console.log(`Setting devVersion ${versions.devVersion} as output`);
core.setOutput('devVersion', versions.devVersion);
