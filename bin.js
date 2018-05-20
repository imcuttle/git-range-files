#!/usr/bin/env node

var grf = require('./');

var argv = require('minimist')(process.argv.slice(2));

var flags = {
  help: !!argv.h || !!argv.help,
  filter: argv.f || argv.filter,
  head: argv._.length ? argv._[0] : undefined
}
if (flags.help) {
  console.log([
    ' Usage: grf [head] [options] ',
    '',
    ' Options: ',
    '   -f, --filter',
    '   -h, --help'
  ].join('\n'))
  process.exit(0);
}

grf({ head: flags.head, filter: flags.filter }, function(err, files) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  files.forEach(function(f) {
    console.log(f.status+' '+f.filename);
  });
});
