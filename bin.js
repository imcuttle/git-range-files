#!/usr/bin/env node

var grf = require('./');

var argv = require('minimist')(process.argv.slice(2));

var flags = {
  help: !!argv.h || !!argv.help,
  filter: argv.f || argv.filter,
  relative: argv.r || argv.relative,
  head: argv._.length ? argv._[0] : undefined
}
if (flags.help) {
  console.log([
    ' Usage: grf [head] [options] ',
    '',
    ' Options: ',
    '   -f, --filter    ',
    '   -r, --relative  ',
    '   --no-relative  ',
    '   -h, --help      '
  ].join('\n'))
  process.exit(0);
}

grf({ head: flags.head, filter: flags.filter, relative: flags.relative }, function(err, files) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  files.forEach(function(f) {
    console.log(f.status+' '+f.filename);
  });
});
