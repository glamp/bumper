# upwards
Use this to increment versions of things--namely non-standard, npm-like package.json files. For instance, the
manifest.json file in your Chrome extension ;).

```bash
$ npm install upwards -g
$ upwards -h
Usage:
  upwards <manifest.json> [--release=<type>]
  upwards -h | --help | --version

Options:
  -r --release	Release type (major, minor, patch, premajor, preminor, prepatch, or prerelease) [default: patch].
$ upwards manifest.json patch
```
