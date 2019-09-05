'use strict';

const events = require('../../events');

module.exports = () => {
  let file = null;
  if ( process.argv.slice(2).shift() ) {
    file = process.argv.slice(2).shift();
    events.emit( 'file-created', file );
  } else events.emit( 'error', 'Error creating file' );
};
