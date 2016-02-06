var expect = require('chai').expect;
var type = require('../src/type');

describe('type', () => {
  describe('.getType', () => {
    it('should throw an error if called with an unknown type', () => {
      expect(() => type.getType(undefined)).to.throw(/unknown/);
    });
  });

  describe('.show', () => {
    it('should throw an error if called with an unknown type descriptor', () => {
      expect(() => type.show({unknownType: true})).to.throw(/unknown/);
    });
  });
});

