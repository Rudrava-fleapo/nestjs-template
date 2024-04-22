const nestCliConfig = require('./nest-cli.json');

module.exports = {
  '*.ts': [
    // by default, lint-staged appends names of the staged files to the commands it runs
    // that leads to us only testing the changed files, which won't let us check coverage
    // this syntax lets us "swallow" the staged file names for this command
    (/* filenames */) => 'npm run tsc',
    'npm run format',
    'npm run lint',
  ],
};
