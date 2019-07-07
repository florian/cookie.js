import assert from 'assert';
import cookie from '../../dist/cookie.esm.js';
import shared from '../shared';

describe('ES Module Build', () => {
  it('imports properly', () => {
    assert(typeof cookie, 'function');
    assert(typeof cookie.get, 'function');
  });

  shared.test({ cookie });
});
