exports.test = function(context) {
  const { cookie } = context;

  describe('cookie', function() {
    var mockStorage;

    before(function() {
      global.document = {
        get cookie() {
          return mockStorage.map(cookie => cookie.split(';')[0]).join(';');
        },

        set cookie(value) {
          mockStorage.push(value);
        }
      };
    });

    after(function() {
      global.document = undefined;
    });

    beforeEach(function() {
      cookie.defaults = {};
      mockStorage = [];
    });

    describe('set', function() {
      it('should set secure flag for a cookie', function() {
        cookie.set('a', '1', { secure: true });

        mockStorage.should.deep.equal(['a=1;secure']);
      });

      it('uses the default secure flag', function() {
        cookie.defaults = { secure: true };
        cookie.set('a', '1');

        mockStorage.should.deep.equal(['a=1;secure']);
      });

      it('allows to override the default secure flag', function() {
        cookie.defaults = { secure: true };
        cookie.set('a', '1', { secure: false });

        mockStorage.should.deep.equal(['a=1']);
      });

      it('should set SameSite attribute for a cookie', function() {
        cookie.set('a', '1', { sameSite: 'Strict' });

        mockStorage.should.deep.equal(['a=1;SameSite=Strict']);
      });

      it('ignores SameSite attribute when set to null', function() {
        cookie.set('a', '1', { sameSite: null });

        mockStorage.should.deep.equal(['a=1']);
      });

      it('uses the default sameSite attribute', function() {
        cookie.defaults = { sameSite: 'Lax' };
        cookie.set('a', '1');

        mockStorage.should.deep.equal(['a=1;SameSite=Lax']);
      });

      it('allows to override the default sameSite attribute', function() {
        cookie.defaults = { sameSite: 'Lax' };
        cookie.set('a', '1', { sameSite: null });

        mockStorage.should.deep.equal(['a=1']);
      });
    });
  });
};
