const fs = require("fs")

fs.readFileSync('/github/workspace/pom.xml')

const parseString = require('xml2js').parseString;

parseString(examplePom, (err, result) => {
    console.log(result.project.version[0])
})