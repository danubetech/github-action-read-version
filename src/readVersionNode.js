const incrementMajorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split(".");
    const majorVersion = parseInt(splitString[0]);

    const releaseVersion = `${majorVersion + 1}.0.0`
    const devVersion = null

    return { releaseVersion, devVersion }
}

const incrementMinorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split(".");
    const majorVersion = splitString[0];
    const minorVersion = parseInt(splitString[1]);

    const releaseVersion = `${majorVersion}.${minorVersion + 1}.0`
    const devVersion = null

    return { releaseVersion, devVersion }
}

const incrementPatchVersion = (parsedVersion) => {
    const splitString = parsedVersion.split(".");
    const majorVersion = splitString[0];
    const minorVersion = parseInt(splitString[1]);
    const patchVersion = parseInt(splitString[2]);

    let releaseVersion;
    let devVersion;
    if (patchVersion === 0) {
        releaseVersion = `${majorVersion}.${minorVersion}.${patchVersion + 1}`;
        devVersion = null;
    }

    return { releaseVersion, devVersion }
}


const readVersionNode = (parsedVersion, versionCore) => {
    switch (versionCore) {
        case 'major':
            return incrementMajorVersion(parsedVersion);
        case 'minor':
            return incrementMinorVersion(parsedVersion);
        case 'patch':
            return incrementPatchVersion(parsedVersion);
    }
}

exports.readVersionNode = readVersionNode;