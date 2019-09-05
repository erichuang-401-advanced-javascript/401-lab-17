'use strict';

const server = require('socket.io')(3000);
const events = require('./events');

//general connection
server.on( 'connection', socket => {
  console.log( 'General server servin\'', socket.id );
  socket.emit( 'message', 'Connected to server' );

  socket.on( 'file-saved', message => {
    console.log( 'Message received --- \'file-saved\':', message );
    events.emit( 'file-saved', message );
    socket.emit( 'file-saved', message );
  });

  socket.on( 'error', message => {
    console.log( 'Message received --- \'error\':', message );
    events.emit( 'error', message );
    socket.emit( 'error', message );
  });

  socket.on( 'disconnect', () => {
    console.log( 'General server not servin\'', socket.id );
  });
});

//log connection
const logger = server.of('/log');

logger.on( 'connection', socket => {
  console.log( 'Logger server servin\'', socket.id );
  socket.emit( 'message', 'Connected to /log' );

  //to logger
  events.on( 'message', message => socket.emit( 'message', `${new Date( Date.now() )} --- Message received by /log server: ${message}` ) );
  events.on( 'file-saved', message => socket.emit( 'file-saved', `${new Date( Date.now() )} --- File status received by /log server: ${message}` ) );
  events.on( 'error', message => socket.emit( 'error', `${new Date( Date.now() )} --- File error received by /log server: ${message}` ) );

  socket.on( 'disconnect', () => {
    console.log( 'Logger server not servin\'', socket.id );
  });
});
