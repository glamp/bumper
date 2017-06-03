const fs = require('fs');
const semver = require('semver');
const pkg = require('./package.json');
var { docopt } = require('docopt');

const doc = `
Usage:
  bumper <package.json> <release>
  bumper -h | --help | --version
`

var args = docopt(doc, { version: pkg.version });

var package = JSON.parse(fs.readFileSync(args['<package.json>']));
var currentVersion = package.version;
var release = args['<release>'];

var newVersion = semver.inc(currentVersion, release);
package.version = newVersion;

fs.writeFileSync(args['<package.json>'], JSON.stringify(package, null, 2));
