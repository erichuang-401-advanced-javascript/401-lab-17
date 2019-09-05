'use strict';

const events = require('../../events');
const fileManager = require('./fileManager');
const initFile = require('./initFile');

events.on( 'file-created', fileManager.readFile );
events.on( 'file-read', fileManager.switcharoo );
events.on( 'file-edited', fileManager.writeFile );

initFile();
