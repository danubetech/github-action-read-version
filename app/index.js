const readVersionPython = () => {
    const fs = require("fs");
    const path = require("path");
    let version = [];

    const getFilesRecursively = (directory) => {
        const filesInDirectory = fs.readdirSync(directory);
        for (const file of filesInDirectory) {
            const absolute = path.join(directory, file);
            console.log('absolute', absolute);
            if (fs.statSync(absolute).isDirectory()) {
                getFilesRecursively(absolute);
            } else {
                if (absolute === '/Users/devfox/code/universal-resolver-didcomm/aries_cloudagent/version.py') {
                    console.log('Version found')
                    return fs.readFileSync(absolute, 'utf-8')
                        .split('\n')
                        .filter(line => {
                            console.log(line)
                            line.startsWith('__version__')
                        });
                }
            }
        }
    };

    version = getFilesRecursively('/Users/devfox/code/universal-resolver-didcomm');

    console.log(version);
}

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

readVersionPython();

// const core = require('@actions/core');
// const framework = core.getInput('framework', { trimWhitespace: true, required: true });
//
// let version = ''
// switch (framework) {
//     case 'maven':
//         version = readVersionMaven();
//         break;
//     case 'node':
//     case 'nodejs':
//         const packageJson = require('/github/workspace/package.json');
//         version = packageJson.version;
//         break;
//     default:
//         throw Error(`Framework ${framework} not supported`)
// }
//
// console.log(`Setting version ${version} as output`);
// core.setOutput('version', version)