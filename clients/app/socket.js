'use strict';

const events = require('../../events');
const socket = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const generalConnection = socket.connect( API_URL );

events.on( 'file-saved', message => {
  generalConnection.emit( 'file-saved', message );
});

events.on( 'error', error => {
  generalConnection.emit( 'error', error );
});

