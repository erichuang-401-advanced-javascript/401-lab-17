'use strict';

const events = require('../../events');
const fileManager = require('./fileManager');
const initFile = require('./initFile');
const socket = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const generalConnection = socket.connect( API_URL );

//read write
events.on( 'file-created', fileManager.readFile );
events.on( 'file-read', fileManager.switcharoo );
events.on( 'file-edited', fileManager.writeFile );

//to server
events.on( 'file-saved', message => generalConnection.emit( 'file-saved', message ) );
events.on( 'error', error => generalConnection.emit( 'error', error ) );

//from server
generalConnection.on( 'message', message => console.log( 'Server message:', message ) );
generalConnection.on( 'file-saved', message => console.log( 'Server confirmed:', message ) );
generalConnection.on( 'error', message => console.log( 'Server confirmed:', message ) );

initFile();
