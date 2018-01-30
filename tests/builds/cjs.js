var assert = require('assert');
var cookie = require('../../dist/cookie.cjs.js');

describe('CommonJS Build', () => {
  it('imports properly', () => {
    assert(typeof cookie, 'function');
    assert(typeof cookie.get, 'function');
  })
})
