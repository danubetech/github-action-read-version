const fs = require("fs")

const pom = fs.readFileSync('/github/workspace/pom.xml')

const parseString = require('xml2js').parseString;

parseString(pom, (err, result) => {
    console.log(result.project.version[0])
})