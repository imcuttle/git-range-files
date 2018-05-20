# Git Range Files  [![Build Status](https://travis-ci.org/imcuttle/git-range-files.svg?branch=master)](https://travis-ci.org/imcuttle/git-range-files)

This module returns an array of git range files and their status acording to git.

Inspired By [staged-git-files](https://github.com/mcwhittemore/staged-git-files).

## How it works

* git version < 2.0.0 execute
	git diff --name-status b8c40a94db582718...813f2c4911e926c0

* git version >= 2.0.0 execute
	git -c core.quotepath=false diff --name-status b8c40a94db582718...813f2c4911e926c0

## Usage

`npm install git-range-files`

```js
var grf = require('git-range-files');
grf(function(err, results) {
	// WHAT EVER YOU SO PLEASE
});

grf({ head: 'f5f240fad3f6...e87900fad3f6' }, function(err, results){
	// WHAT EVER YOU SO PLEASE
});
```

**Example Results**

```json
[
	{
		"filename": "package.json",
		"status": "Added"
	},
	{
		"filename": "readme.md",
		"status": "Modified"
	},
	{
		"filename": "index.js",
		"status": "Renamed"
	}
]
```

## Usage as a cli

```sh
$ grf
Added package.json
Modified readme.md
Renamed index.js
```

## API

### grf({ filter, head }, callback)

Get a list of git range files

* filter: string of git status codes. No spaces
* callback:
	* err: the error
	* results: file object array.

### grf.getHead(callback)

Get head that will be used in the diff to ID which files are waiting to be staged.

* callback
	* err: the error
	* head: the git commit id which is aliased to head.

### grf.readFile(filename, [options], callback)

This is a proxy for [fs.readFile](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback) with one change. The filename will be relative to the `grf.cwd`

### grf.debug

Boolean that flips logging on and off. By default this is false. If true, all git commands will be console logged.

### grf.includeContent

If true, include content will add a `content` or `err` param to the file object.

* Default Value: false
* Content Param: the content of the file staged
* Err Param: the error message received while trying to read the file.

### grf.cwd

The current working directory. AKA: where the .git folder you care about is.

# Default Value: is equal to process.cwd() of your app.g

## Statuses

**SGF-Status (git status code)**

* Added (A)
* Copied (C)
* Deleted (D)
* Modified (M)
* Renamed (R)
* Type-Change (T) [i.e. regular file, symlink, submodule, etc.]
* Unmerged (U)
* Unknown (X)
