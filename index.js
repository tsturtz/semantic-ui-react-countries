#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const { Dataset } = require('data.js');
const axios = require('axios');
const fs = require('fs');

const ora = require('ora');

program
  .version('0.1.0', '-v --version')
  .option('-n, --name <name>', 'The name of the constant to be exported.', 'COUNTRY_OPTIONS')
  .option('-p, --path <path>', 'The path that the file should be written to.', (process.cwd() + '/countriesData.js'))
  .option('--no-flags', 'Do not include flag attribute.')
  .action(function(file) {
    console.log('Export const name:', chalk.magenta(program.name));
    console.log('Writing to file path:', chalk.magenta(program.path));
    console.log('Include flags attribute:', chalk.magenta(program.flags));
  })
  .parse(process.argv);

const fetching = ora('Fetching current ISO-3166-1 country data').start();
let writing = null;

const datahub = 'https://datahub.io/core/country-list/datapackage.json';

(async () => {
  const dataset = await Dataset.load(datahub)
  for (const id in dataset.resources) {
    if (dataset.resources[id]._descriptor.format === 'json' && dataset.resources[id]._descriptor.name === 'data_json') {
      try {
        const response = await axios.get(dataset.resources[id].path);

        fetching.succeed();
        writing = ora('Writing file to path ' + program.path).start();

        const countryData = response.data.map((country) => {
          const obj = {
            text: country.Name,
            key: country.Code,
            value: country.Code,
          }
          if (program.flags) {
            return {
              ...obj,
              flag: country.Code
            }
          }
          return obj;
        });

        fs.writeFile(
          program.path,
          'export const ' + program.name + ' = ' + JSON.stringify(countryData),
          (err) => {
            if (err) {
              console.error(chalk.red('✘'), 'There was an error: ', err);
            } else {
              writing.succeed();
              console.log(chalk.grey('export const ' + program.name + ' = ' + JSON.stringify(countryData)).substr(0, 500) + ' ...');
              console.log(chalk.green('✔'), chalk.green(program.path), 'has been updated successfully!');
            }
          }
        );
      } catch (err) {
        fetching.fail();
        writing.fail();
        console.error(chalk.red('✘'), 'There was an error: ', err);
      }
    }
  }
})()