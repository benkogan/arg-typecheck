var expect = require('chai').expect;
var typecheck = require('../src').typecheck;
var t = require('../src').types;

describe('typeCheck', () => {
  describe('in a "use strict" context', () => {
    function fn() { 'use strict'; typecheck(arguments, []); }

    it('should not throw an error on invocation', () => {
      expect(() => fn()).to.not.throw();
    });
  });

  describe('fn()', () => {
    function fn () { typecheck(arguments, []); }

    it('should not typecheck for fn(number)', () => {
      expect(() => fn(1)).to.throw(/TypeCheckError/);
    });

    it('should typecheck for fn()', () => {
      expect(() => fn()).to.not.throw();
    });
  });

  describe('fn(string)', () => {
    function fn (str) { typecheck(arguments, [t.String()]); return str; }

    it('should not typecheck for fn()', () => {
      expect(() => fn()).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(number)', () => {
      expect(() => fn(1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(string, number)', () => {
      expect(() => fn('a', 1)).to.throw(/TypeCheckError/);
    });

    it('should typecheck for fn(string)', () => {
      expect(() => fn('a')).to.not.throw();
    });
  });

  describe('fn(function)', () => {
    function fn (fun) { typecheck(arguments, [t.Function()]); return fun; }

    it('should not typecheck for fn()', () => {
      expect(() => fn()).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(number)', () => {
      expect(() => fn(1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(function, number)', () => {
      expect(() => fn(() => 1, 1)).to.throw(/TypeCheckError/);
    });

    it('should typecheck for fn(function)', () => {
      expect(() => fn(() => 1)).to.not.throw();
    });
  });

  describe('fn(object)', () => {
    function fn (obj) { typecheck(arguments, [t.Object()]); return obj; }

    it('should not typecheck for fn()', () => {
      expect(() => fn()).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(number)', () => {
      expect(() => fn(1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(object, number)', () => {
      expect(() => fn({}, 1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(array)', () => {
      expect(() => fn([])).to.throw(/TypeCheckError/);
    });

    it('should typecheck for fn(object)', () => {
      expect(() => fn({})).to.not.throw();
    });
  });

  describe('fn(array)', () => {
    function fn (arr) { typecheck(arguments, [t.Array()]); return arr; }

    it('should not typecheck for fn()', () => {
      expect(() => fn()).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(number)', () => {
      expect(() => fn(1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn(array, number)', () => {
      expect(() => fn([], 1)).to.throw(/TypeCheckError/);
    });

    it('should not typecheck for fn({})', () => {
      expect(() => fn({})).to.throw(/TypeCheckError/);
    });

    it('should typecheck for fn(array)', () => {
      expect(() => fn([])).to.not.throw();
    });
  });
});

