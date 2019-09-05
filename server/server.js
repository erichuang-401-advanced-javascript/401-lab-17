'use strict';

const server = require('socket.io')(3000);

server.on( 'connection', socket => {
  console.log( 'Server is servin\'');

  socket.on( 'message', ( message ) => {
    socket.emit( 'message', message );
  });

  socket.on( 'disconnect', () => {
    console.log( 'Server not servin\'');
  });
});
