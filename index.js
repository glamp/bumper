const fs = require('fs');
const semver = require('semver');
const pkg = require('./package.json');
const { docopt } = require('docopt');

const doc = `
Usage:
  bumper <manifest.json> [--release=<type>]
  bumper -h | --help | --version

Options:
  -r --release	Release type (major, minor, patch, premajor, preminor, prepatch, or prerelease) [default: patch].
`

var args = docopt(doc, { version: pkg.version });
var manifestFile = args['<manifest.json>'];

if (! fs.existsSync(manifestFile)) {
  process.stderr.write(`manfiest file does not exist: '${maifestFile}'`);
  process.exit(1);
}

var package;
try {
  package = JSON.parse(fs.readFileSync(manifestFile));
} catch(e) {
  process.stderr.write(`manfiest file is not valid JSON: '${e}'`);
  process.exit(1);
}

var currentVersion = package.version;
var release = args['--release'] || 'patch';

var newVersion = semver.inc(currentVersion, release);

if (newVersion==null) {
  process.stderr.write(`could not bump version. probably invalid version in your manifest.json file. the current value is ${currentVersion}`);
  process.exit(1);
}

package.version = newVersion;
fs.writeFileSync(manifestFile, JSON.stringify(package, null, 2));
