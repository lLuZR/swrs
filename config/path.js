const fs = require('fs');
const path = require('path');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const HOME_PATH = getUserHome();
const REGISTRY_PATH = path.resolve(HOME_PATH, '.npmregistry');
const FILE_NAME = '.registryInfo';
const FILE_PATH = path.resolve(REGISTRY_PATH, FILE_NAME);
module.exports = {
  HOME_PATH,
  REGISTRY_PATH,
  FILE_NAME,
  FILE_PATH,
};