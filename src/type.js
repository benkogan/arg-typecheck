var _ = require('lodash/lang');

var types = {
  Array:    function ()     { return {isArray:    true}; },
  String:   function ()     { return {isString:   true}; },
  Number:   function ()     { return {isNumber:   true}; },
  Object:   function ()     { return {isObject:   true}; },
  Function: function ()     { return {isFunction: true}; },
  Maybe:    function (x)    { return {isMaybe: true,  some: x}; },
  Option:   function (x)    { return {isOption: true, some: x}; },
  Either:   function (x, y) { return {isEither: true, left: x, right: y}; },
};

function getType(p) {
  if (_.isArray(p))       return types.Array();
  if (_.isString(p))      return types.String();
  if (_.isNumber(p))      return types.Number();
  if (_.isPlainObject(p)) return types.Object();
  if (_.isFunction(p))    return types.Function();
  else throw UnknownTypeError('getType', typeof p);
}

function show(type) {
  if (type.isArray)     return 'array';
  if (type.isString)    return 'string';
  if (type.isNumber)    return 'number';
  if (type.isObject)    return 'object';
  if (type.isFunction)  return 'function';
  if (type.isMaybe)     return 'maybe<' + show(type.some) + '>';
  if (type.isOption)    return 'option<' + show(type.some) + '>';
  if (type.isEither)    return 'either<' + [show(type.left),show(type.right)] + '>';
  else throw UnknownTypeError('show', JSON.stringify(type));
}

function UnknownTypeError(fn, t) {
  return new Error(fn + ' called with unknown type (`' + t + '`)');
}

module.exports = {
  types: types,
  getType: getType,
  show: show,
};

