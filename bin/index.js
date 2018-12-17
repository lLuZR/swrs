#!/usr/bin/env node
const program = require('commander');
const package = require('../package');
const switchRgistry = require('../switch');
const log = require('../log');

const command = process.argv[2];
if (!~Object.keys(switchRgistry).concat('-v', '--version', '-h').indexOf(command)) {
  log.error(`Command ${command} does not exist, please enter -h to view the help`);
}

program
  .version(package.version, '-v, --version')
  .usage('switch-registry')
  .description(package.description)

program
  .command('list')
  .alias('ls')
  .description('show all registry')
  .action( () => {
    switchRgistry.init();
    switchRgistry.list();
  });

program
  .command('add <name> <registry>')
  .description('add a registry')
  .action((name, registryUrl) => {
    switchRgistry.init();
    switchRgistry.add(name, registryUrl);
  });

program
  .command('use <name>')
  .alias('change')
  .description('use or change a registry')
  .action( name => {
    switchRgistry.init();
    switchRgistry.use(name);
  });

program
  .command('remove <name>')
  .description('remove a registry')
  .action( name => {
    switchRgistry.init();
    switchRgistry.remove(name);
  });

program.parse(process.argv);
