exports.test = function(context) {
  const { cookie } = context;

  describe("cookie", function() {
    var mockStorage;

    before(function() {
      global.document = {
        get cookie() {
          return mockStorage;
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
      mockStorage = [];
    });

    describe("set", function() {
      it("should set secure flag for a cookie", function() {
        cookie.set("a", "1", { secure: true });

        document.cookie.should.deep.equal(["a=1;secure"]);
      });
    });
  });
};
