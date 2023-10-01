const fs = require('fs');
const path = './bot.log';

function logError(error) {
  const message = `[${new Date().toISOString()}] ${error}\n`;
  fs.appendFileSync(path, message, 'utf8');
}

module.exports = logError;
