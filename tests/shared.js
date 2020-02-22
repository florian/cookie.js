const chai = require('chai');
const should = chai.should();

exports.test = function(context) {
  const { cookie } = context;

  describe('cookie', function () {
    before(function () {
      this.jsdom = require('jsdom-global')();
    });

    after(function () {
      this.jsdom();
    });

    beforeEach(function () {
      cookie.empty();
      cookie.set({
        a: '1',
        b: '2',
        c: '3'
      });
    });

    afterEach(function () {
      cookie.empty();
    });

    it('should be a function', function () {
      cookie.should.be.a('function');
    });

    describe('utils', function () {
      describe('isArray', function () {
        it('should spot arrays', function () {
          cookie.utils.isArray([]).should.be.true;
          cookie.utils.isArray(new Array).should.be.true;
        });

        it('should return false for other values', function () {
          cookie.utils.isArray(42).should.be.false;
        });
      });

      describe('isPlainObject', function () {
        it('should spot plain objects', function () {
          cookie.utils.isPlainObject({}).should.be.true;
          cookie.utils.isPlainObject(new Object).should.be.true;
        });

        it('should return false for constructed objects', function () {
          cookie.utils.isPlainObject(window).should.be.false;
          cookie.utils.isPlainObject(new Date).should.be.false;
        });

        it('should return false for undefined values', function () {
          cookie.utils.isPlainObject(undefined).should.be.false;
          cookie.utils.isPlainObject(null).should.be.false;
        });

        it('should return false for other values', function () {
          cookie.utils.isPlainObject(42).should.be.false;
        });
      });

      describe('toArray', function () {
        it('should convert array-like objects to arrays', function () {
          var getArguments = function () {
            return arguments;
          }(1, 'a', true);
          cookie.utils.toArray(getArguments).should.be.an('array').and.eql([1, 'a', true]);

          cookie.utils.toArray(document.getElementsByTagName('body')).should.eql([document.body]);
        });

        it('should directly return if the value is already an array', function () {
          cookie.utils.toArray([1, 2, 3]).should.eql([1, 2, 3]);
          cookie.utils.toArray(new Array('a', 'b')).should.eql(['a', 'b']);
        });
      });

      describe('getKeys', function () {
        it('should retrieve object keys', function () {
          cookie.utils.getKeys({a: 1, b: 2}).should.eql(['a', 'b']);
        });
      });

      describe('encode', function () {
        it('should encode , ; \" \\ = % and whitespace', function () {
          cookie.utils.encode(",;\"\\=\s%").should.equal('%2C%3B%22%5C%3Ds%25');
        });

        it('should not encode any other characters', function () {
          cookie.utils.encode(':').should.equal(':');
        });
      });

      describe('retrieve', function () {
        it('should retrieve defined values', function () {
          cookie.utils.retrieve(true, false).should.equal(true);
          cookie.utils.retrieve(false, true).should.equal(false);
          cookie.utils.retrieve('a', 'b').should.equal('a');
        });

        it('should return the fallback for undefined values', function () {
          cookie.utils.retrieve(undefined, 42).should.equal(42);
          cookie.utils.retrieve(null, 42).should.equal(42);
        });
      });
    });

    describe('enabled', function () {
      it('should be a boolean', function () {
        cookie.enabled().should.be.a('boolean');
      });
    });

    describe('set', function () {
      it('should be able to set a single cookie', function () {
        document.cookie.should.contain('a=1');
      });

      it('should not throw an error when setting something that can be casted to a string', function () {
        cookie.set('n', 5);
        document.cookie.should.contain('n=5');
      });

      it('should be able to set several cookies at once', function () {
        document.cookie.should.contain('b=2').and.contain('c=3');
      });

      it('should return the cookie object', function () {
        cookie.set('a', '1').should.equal(cookie);
      });
    });

    describe('setDefault', function () {
      it('should not set cookies that already exist', function () {
        cookie.set('existingKey', 'x');
        cookie.setDefault('existingKey', 'y');
        document.cookie.should.contain('existingKey=x');
      });

      it('should set cookies that do not exist yet', function () {
        cookie.setDefault('newKey', 'y');
        document.cookie.should.contain('newKey=y');
      });

      it('should work with object arguments', function () {
        cookie.set('existingKey', 'x');
        cookie.setDefault({
          existingKey: 'y',
          reallyNewKey: 'y',
          reallyNewKey2: 'y'
        });

        document.cookie.should.not.contain('existingKey=y');
        document.cookie.should.contain('reallyNewKey=y');
        document.cookie.should.contain('reallyNewKey2=y');
      });

      it('should return the cookie object', function () {
        cookie.setDefault('defaultKey', 'y').should.equal(cookie);
      });
    });

    describe('get', function () {
      it('should return a string when getting a single cookie', function () {
        cookie.get('a').should.be.a('string');
      });

      it('should retrieve the correct value', function () {
        cookie.get('a').should.equal('1');
      });

      it("should return undefined if the cookie doesn't exist and no fallback is specified", function () {
        chai.expect(cookie.get('__undef__')).to.be.undefined;
      });

      it('should return the fallback if the cookie is undefined', function () {
        cookie.get('__undef__', 'fallback').should.equal('fallback');
      });

      it('should return an object if several keys are specified', function () {
        cookie.get(['a', 'b']).should.be.an('object');
      });

      it('should return an object with the correct values if several keys are specified', function () {
        cookie.get(['a', 'b']).should.eql({a: '1', b: '2'});
      });

      it('should respect fallbacks with several keys', function () {
        cookie.get(['a', '__undef__'], 'fallback').should.eql({a: '1', __undef__: 'fallback'});
      });

      it('should work like calling cookie like a function', function () {
        cookie('a').should.equal(cookie.get('a'));
        cookie('__undef__', 'fallback').should.equal(cookie.get('__undef__', 'fallback'));
        cookie(['a', 'b']).should.eql(cookie.get(['a', 'b']));
        cookie(['a', '__undef__'], 'fallback').should.eql(cookie.get(['a', '__undef__'], 'fallback'));
      });

      it('should be able to get cookies with a = in the value', function () {
        document.cookie = 'a=a=b=c=d';
        document.cookie = 'b=something';
        document.cookie = 'c=a=c';
        document.cookie = 'd=a=b';

        cookie('a').should.equal('a=b=c=d');
        cookie('b').should.equal('something');
        cookie('c').should.equal('a=c');
        cookie('d').should.equal('a=b');
      });
    });

    describe('remove', function () {
      it('should remove a single passed value', function () {
        cookie.remove('a');
        document.cookie.should.not.contain('a=');
      });

      it('should remove all passed values', function () {
        cookie.remove('a', 'b');
        document.cookie.should.not.contain('a=').and.not.contain('b=');
      });

      it('should remove the values of a passed array', function () {
        cookie.remove(['a', 'b']);
        document.cookie.should.not.contain('a=').and.not.contain('b=');
      });

      it('should return the cookie object', function () {
        cookie.remove('a').should.equal(cookie);
      });
    });

    describe('removeSpecific', function () {
      it('should be able to remove properties with options', function () {
        cookie.empty();

        cookie.set('a', 'b', { path: '/tests' });
        cookie.removeSpecific('a', { path: '/tests' });
        document.cookie.should.not.contain('a=');
      });

      it('should be able to remove multiple properties with options', function () {
        cookie.empty();

        cookie.set('a', 'b', { path: '/tests' });
        cookie.set('b', 'b', { path: '/tests' });
        cookie.removeSpecific(['a', 'b'], { path: '/tests' });
        document.cookie.should.not.contain('a=');
        document.cookie.should.not.contain('b=');
      });

      it('should not fail if no options were passed', function () {
        cookie.empty();

        cookie.set('a', 'b');
        cookie.removeSpecific('a');
        document.cookie.should.not.contain('a=');
      });
    });

    describe('empty', function () {
      it('should remove all cookies', function () {
        cookie.empty();
        cookie.all.should.not.include.keys('a', 'b');
      });

      it('should return the cookie object', function () {
        cookie.empty().should.equal(cookie);
      });
    });

    describe('all', function () {
      it('should return an object', function () {
        cookie.all().should.be.an('object');
      });

      it('should include all set cookies', function () {
        cookie.all().a.should.equal('1');
        cookie.all().b.should.equal('2');
      });
    });
  });
}
