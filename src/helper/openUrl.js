const {exec} = require('child_process');

module.exports = url => {
  switch (process.platform) {
    // Mac 环境
    case 'darwin':
      exec(`open ${url}`);
      break;
    // Windows 环境
    case 'win32':
      exec(`start ${url}`);
      break;
  }
};
