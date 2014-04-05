var ImplementationError = function(message) {
  'use strict';

  this.name = 'ImplementationError'
  this.message = this.name + ': ' + (!!message ? (message + ' not implemented') : '')
}

ImplementationError.prototype = Object.create(Error.prototype)

module.exports = ImplementationError
