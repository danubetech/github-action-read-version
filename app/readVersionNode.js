const incrementMajorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split(".");
    const majorVersion = parseInt(splitString[0]);

    const releaseVersion = `${majorVersion + 1}.0.0`
    const devVersion = `${majorVersion + 1}.1.0`

    return { releaseVersion, devVersion }
}

const incrementMinorVersion = (parsedVersion) => {
    const splitString = parsedVersion.split(".");
    const majorVersion = splitString[0];
    const minorVersion = parseInt(splitString[1]);

    const releaseVersion = `${majorVersion}.${minorVersion}.0`
    const devVersion = `${majorVersion}.${minorVersion + 1}.0`

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
        releaseVersion = `${majorVersion}.${minorVersion - 1}.${patchVersion + 1}`;
        devVersion = `${majorVersion}.${minorVersion - 1}.${patchVersion + 2}`;
    } else {
        releaseVersion = `${majorVersion}.${minorVersion}.${patchVersion}`;
        devVersion = `${majorVersion}.${minorVersion}.${patchVersion + 1}`;
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