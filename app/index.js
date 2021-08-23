const examplePom = '<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"\n' +
    '\txsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">\n' +
    '\n' +
    '\t<modelVersion>4.0.0</modelVersion>\n' +
    '\t<groupId>com.danubetech</groupId>\n' +
    '\t<artifactId>uni-resolver-web</artifactId>\n' +
    '\t<packaging>war</packaging>\n' +
    '\t<name>uni-resolver-web</name>\n' +
    '\t<version>0.4.0</version>\n' +
    '\n' +
    '\t<parent>\n' +
    '\t\t<groupId>decentralized-identity</groupId>\n' +
    '\t\t<artifactId>uni-resolver</artifactId>\n' +
    '\t\t<version>0.3-SNAPSHOT</version>\n' +
    '\t</parent>\n' +
    '</project>';

const parseString = require('xml2js').parseString;

parseString(examplePom, (err, result) => {
    console.log(result.project.version[0])
})