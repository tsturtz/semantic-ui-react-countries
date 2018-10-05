const program = require('commander');
const should = require('should');

program
  .version('0.1.0', '-v --version')
  .option('-n, --name <name>', 'The name of the constant to be exported.', 'COUNTRY_OPTIONS')
  .option('-p, --path <path>', 'The path that the file should be written to.', (__dirname + '/countriesData.js'))
  .option('--no-flags', 'Do not include flag attribute.');

// DEFAULT
program.parse(['node', 'test']);
program.name.should.equal('COUNTRY_OPTIONS');
program.path.should.equal(__dirname + '/countriesData.js');
program.flags.should.equal(true);

// SHORT
program.parse([
  'node', 'test',
  '-n', 'testingName',
  '-p', './testingPath'
]);
program.name.should.equal('testingName');
program.path.should.equal('./testingPath');
program.flags.should.equal(true);

// LONG and no-flags
program.parse([
  'node', 'test',
  '--name', 'testingName',
  '--path', './testingPath',
  '--no-flags'
]);
program.name.should.equal('testingName');
program.path.should.equal('./testingPath');
program.flags.should.equal(false);