(function (undefined) {

   var isArray = Array.isArray || function (value) { // check if value is an array created with [] or new Array
      return Object.prototype.toString.call(value) === '[object Array]';
   },

   isPlainObj = function (value) { // check if value is an object that was created with {} or new Object
      return Object.prototype.toString.call(value) === '[object Object]';
   },

   getKeys = Object.keys || function (obj) { // Object.keys polyfill
      var keys = [],
          key = '';
      for (key in obj) {
         if (obj.hasOwnProperty(key)) keys.push(key);
      }
      return keys;
   },

   retrieve = function (value, fallback) { // return fallback if the value is undefined, otherwise return value
      return value === undefined ? fallback : value;
   },

   _cookie = {

      set: function (key, value, options) {

         if (isPlainObj(key)) {
            for (var k in key) {
               if (key.hasOwnProperty(k)) this.set(k, key[k]);
            }

         } else {

            options = options || {};
            var expires = options.expires || '',
               expiresType = typeof(expires),
               path = options.path ? ';path=' + options.path : '',
               domain = options.domain ? ';domain=' + options.domain : '',
               secure = options.secure ? ';secure' : '';
            if (expiresType === 'string' && expires !== '') expires = ';expires=' + expires;
            else if (expiresType == 'number') { // this is needed because IE does not support max-age
               var d = new Date;
               d.setTime(d.getTime() + expires);
               expires = ';expires=' + d.toGMTString();
            } else if (expires.hasOwnProperty('toGMTString')) expires = ';expires=' + expires.toGMTString();

            document.cookie = key + '=' + escape(value) + expires + path + domain + secure;

         }

         return this; // return the _cookie object to allow chaining

      },

      remove: function (keys) {

         keys = isArray(keys) ? keys : arguments;
         for (var i = 0, length = keys.length; i < length; i++) {
            this.set(keys[i], '', {
               expires: -60 * 60 * 24
            });
         }

         return this; // return the _cookie object to allow chaining

      },

      empty: function () {

         return this.remove(getKeys(this.all())); // return the _cookie object to allow chaining

      },

      get: function (key, fallback) {

         fallback = fallback || undefined;

         if (isArray(key)) {

            var result = {},
               cookies = this.all();

            for (var i = 0, l = key.length; i < l; i++) {
               var value = key[i];
               result[value] = retrieve(cookies[value], fallback);
            }

            return result;


         } else {

            var cookies = this.all();
            return retrieve(cookies[key], fallback);

         }

      },

      all: function () {

         if (document.cookie == '') return {};

         var match = document.cookie.split('; '),
            results = {};
         for (var i = 0, l = match.length; i < l; i++) {
            var tmp = match[i].split('=');
            results[tmp[0]] = unescape(tmp[1]);
         }

         return results;

      },

      enabled: function () {
         
         var ret = cookie.set('a', 'b').get('a') === 'b';
         cookie.remove('a');
         return ret;

      }

   },

   cookie = function (key, fallback) {
      return _cookie.get(key, fallback);
   },

   methods = ['set', 'remove', 'empty', 'get', 'all', 'enabled'];

   for (var i = 0, l = methods.length; i < l; i++) { // copy all _cookie methods to cookie
      var method = methods[i];
      cookie[method] = _cookie[method];
   }

   window.cookie = cookie;

}());