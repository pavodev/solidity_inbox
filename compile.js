const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //ensures cross-platform compatibility
const source = fs.readFileSync(inboxPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Inbox']; // compile 1 contract and return