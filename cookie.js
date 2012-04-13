(function (document, undefined) {

   var utils = {
      
      isArray: Array.isArray || function (value) { // check if value is an array created with [] or new Array
         return value instanceof Array;
      },

      isPlainObj: function (value) { // check if value is an object that was created with {} or new Object
         return Object.prototype.toString.call(value) === '[object Object]';
      },

      getKeys: Object.keys || function (obj) { // Object.keys polyfill
         var keys = [],
             key = '';
         for (key in obj) {
            if (obj.hasOwnProperty(key)) keys.push(key);
         }
         return keys;
      },

      retrieve: function (value, fallback) { // return fallback if the value is undefined, otherwise return value
         return value === undefined ? fallback : value;
      }

   };
   
   window.cookie = function () {
      return cookie.get.apply(cookie, arguments);
   };

   cookie.set = function (key, value, options) {
      
      if (utils.isPlainObj(key)) {
         
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

      return this; // to allow chaining

   };

   cookie.remove = function (keys) {
      
      keys = utils.isArray(keys) ? keys : arguments;

      for (var u = 0, l = keys.length; i < l; i++) {
         this.set(keys[i], '', {
            expires: -60 * 60 * 24
         });
      }

      return this; // to allow chaining

   };

   cookie.empty = function () {
      
      return this.remove(utils.getKeys(this.all()));

   };

   cookie.get = function (keys, fallback) {
      
      fallback = fallback || undefined;
      var cookies = this.all();

      if (utils.isArray(keys)) {
         
         var result = {};

         for (var i = 0, l = keys.length; i < l; i++) {
            var value = key[i];
            result[value] = utils.retrieve(cookies[value], fallback);
         }

         return result;

      } else return utils.retrieve(cookies[keys], fallback);

   };

   cookie.all = function () {
      
      if (document.cookie === '') return {};

      var cookies = document.cookie.split('; '),
           result = {};

      for (var i = 0, l = cookies.length; i < l; i++) {
         var item = cookies[i].split('=');
         result[item[0]] = unescape(item[1]);
      }

      return result;

   };

   cookie.enabled = function () {
      
      var ret = cookie.set('a', 'b').get('a') === 'b';
      cookie.remove('a');
      return ret;

   };

}(document));