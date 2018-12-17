const { REGISTRY_PATH, FILE_PATH } = require('./config/path');
const fs = require('fs');
const execSync = require('child_process').execSync;
const log = require('./log');

function parseData(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {}
  }
}

function initFile() {
  try {
    if (!fs.existsSync(REGISTRY_PATH)) {
      fs.mkdirSync(REGISTRY_PATH);
    }
    if (!fs.existsSync(FILE_PATH)) {
      fs.openSync(FILE_PATH, 'w+');
    }
  } catch (e) {
    log.error(e);
  }
}

function initFileData() {
  try {
    let currentData = fs.readFileSync(FILE_PATH, 'utf-8');
    currentData = parseData(currentData);
    if (Object.keys(currentData).length <= 0 ) {
      const defaultRegistry = execSync('npm config get registry').toString().slice(0, -1);
      fs.writeFileSync(FILE_PATH, JSON.stringify({
        'default':
        {
          active: true,
          registry: defaultRegistry
        }
      }));
    }
  } catch (e) {
    log.error(e);
  }
}

function init() {
  initFile();
  initFileData();
}

function repeat(str, length) {
  return Array.from(new Array(length)).map( _ => str).join('');
}

function list() {
  try {
    let currentData = fs.readFileSync(FILE_PATH, 'utf-8');
    currentData = parseData(currentData);
    const keyMaxLength = Math.max(...Object.keys(currentData).map( key => key.length), 4);
    for (let key in currentData) {
      const logItem = log[currentData[key].active ? 'success' : 'log'];
      logItem(`${key}${repeat(' ', keyMaxLength - key.length + 2)}${currentData[key].active ? '>' : ' '}${repeat(' ', 2)}${currentData[key].registry}`);
    }
  } catch (e) {
    throw e;
  }
}

function add(name, value) {
  try {
    let currentData = fs.readFileSync(FILE_PATH, 'utf-8');
    currentData = parseData(currentData);
    currentData[name] = {
      registry: value,
      active: false
    };
    fs.writeFileSync(FILE_PATH, JSON.stringify(currentData));
    log.log('add success!');
    log.log(`${name} > ${value}`);
  } catch (e) {
    log.error(e);
  }
}

function use(name) {
  try {
    let currentData = fs.readFileSync(FILE_PATH, 'utf-8');
    currentData = parseData(currentData);
    if ( name in currentData) {
      const config = currentData[name];
      execSync(`npm config set registry ${config.registry}`);
      for (let registry in currentData) {
        currentData[registry].active = false;
      }
      currentData[name].active = true;
      fs.writeFileSync(FILE_PATH, JSON.stringify(currentData));
      log.log('change success!');
      log.log(config.registry);
    } else {
      log.error( `the name '${name}' is't exist, please check again.`);
    }
  } catch (e) {
    log.error(e);
  }
}

function remove(name) {
  try {
    let currentData = fs.readFileSync(FILE_PATH, 'utf-8');
    currentData = parseData(currentData);
    if ( !(name in currentData) ) {
      log.error(`the name '${name}' can't be found in registry`);
    }
    if ( currentData[name].active ) {
      log.error(`the name '${b}' is active and can't be removed`);
    }
    delete currentData[name];
    fs.writeFileSync(FILE_PATH, JSON.stringify(currentData));
    log.log('remove success!');
  } catch (e) {
    log.error(e);
  }
}

module.exports = {
  init: init,
  add: add,
  ls: list,
  list: list,
  change: use,
  use: use,
  remove: remove,
}