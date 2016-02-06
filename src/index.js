var _ = require('lodash/lang');
_.zipWith = require('lodash/zipWith');

var type = require('./type');
var TypeCheckError = require('./TypeCheckError');

module.exports = {
  typecheck: typecheck,
  types: type.types,
};

function typecheck(argObj, pType) {
  var name = getName(argObj.callee);
  var args = Array.prototype.slice.call(argObj);
  var result = check(name, args, pType);
  if (result.correct === false) throw result;
  else return result;
}

function getName(callee) {
  // since arguments.callee.name is not in all js implementations
  return callee.name || callee.toString().match(/function\s+([^\s\(]+)/)[1];
}

function check(name, args, pType) {
  var aType = args.map(type.getType);
  return checkArgs(aType, pType) ? ({correct: true}) : new TypeCheckError(name, aType, pType);
}

function checkArgs(aType, pType) {
  return _.
    zipWith(aType, pType, isTypeMatch).
    reduce(function (acc, b) { return acc && b; }, true);
}

function isTypeMatch(aType, pType) {
  if (_.isUndefined(pType)) return _.isEqual(aType, pType);
  if (pType.isMaybe) return _.isNull(aType) || _.isEqual(aType, pType.some);
  if (pType.isOption) return _.isUndefined(aType) || _.isEqual(aType, pType.some);
  if (pType.isEither) return _.isEqual(aType, pType.left) || _.isEqual(aType, pType.right);
  else return _.isEqual(aType, pType);
}

