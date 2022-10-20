const incrementMajorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = parseInt(splitString[0]) + 1;

    const releaseVersion = `${majorVersion}.0.0`;
    const devVersion = `${majorVersion}.0-SNAPSHOT`;

    return { releaseVersion, devVersion };
}

const incrementMinorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = splitString[0];
    const minorVersion = parseInt(splitString[1].split('-')[0]);

    let releaseVersion;
    let devVersion;
    if (splitString.length === 2) {
        releaseVersion = `${majorVersion}.${minorVersion}.0`;
        devVersion = `${majorVersion}.${minorVersion + 1}-SNAPSHOT`;
    } else {
        releaseVersion = `${majorVersion}.${minorVersion + 1}.0`;
        devVersion = `${majorVersion}.${minorVersion + 2}-SNAPSHOT`;
    }

    return { releaseVersion, devVersion };
}

const incrementPatchVersion = (parsedVersion) => {
    const splitString = parsedVersion.split('.');
    const majorVersion = splitString[0];
    const minorVersion = parseInt(splitString[1].split('-')[0]);

    let releaseVersion;
    let devVersion;
    let patchVersion;
    if (splitString.length === 2) {
        patchVersion = 1;
        releaseVersion = `${majorVersion}.${minorVersion - 1}.${patchVersion}`;
        devVersion = `${majorVersion}.${minorVersion - 1}.${patchVersion}-SNAPSHOT`;
    } else {
        patchVersion = parseInt(splitString[2].split('-')[0]);
        releaseVersion = `${majorVersion}.${minorVersion}.${patchVersion + 1}`;
        devVersion = `${majorVersion}.${minorVersion}.${patchVersion + 1}-SNAPSHOT`;
    }

    return { releaseVersion, devVersion };
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

module.exports = readVersionMaven;