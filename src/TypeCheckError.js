var type = require('./type');

function TypeCheckError(name, aType, pType) {
  this.correct = false;
  this.message = name + '(' + pType.map(type.show) + ') called with (' + aType.map(type.show) + ')';
}
TypeCheckError.prototype = Object.create(Error.prototype);
TypeCheckError.prototype.name = 'TypeCheckError';
TypeCheckError.prototype.constructor = TypeCheckError;

module.exports = TypeCheckError;

