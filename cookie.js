(function(undefined){

    isArray = Array.isArray || function (value) { 
        return Object.prototype.toString.call(value) == '[object Array]';
    },

    isPlainObj = function (value) { // is value an object created with {} or new Object()?
        return Object.prototype.toString.call(value) == '[object Object]';
    },

    getKeys = Object.keys || function (obj) {
        var keys = [];
        for(var key in obj){
            if (obj.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
    },

    _cookie = {
        
        set: function (key, value, options) {
            if (isPlainObj(key)) {
                for (var k in key) {
                    this.set(k, key[k]);
                }
            }

            else {
                options = options || {};
                var expires = options.expires || '',
                    expiresType = typeof(expires),
                    path = options.path ? ';path=' + options.path : '',
                    domain = options.domain ? ';domain=' + options.domain : '',
                    secure = options.secure ? ';secure' : '';
                if (expires !== '' && expiresType == 'string') expires = ';expires=' + expires;
                else if (expiresType == 'number') { // this is needed because IE does not support max-age
                    var d = new Date; 
                    d.setTime(d.getTime() + expires);
                    expires = ';expires=' + d.toGMTString();
                } 
                else if (expires.hasOwnProperty('toGMTString')) expires = ';expires=' + expires.toGMTString();
                document.cookie = key + '=' + escape(value) + expires + path + domain + secure;
            }
            return this;
        },

        remove: function (arg1) {
            var keys = isArray(arg1) ? arg1 : arguments;
            for (var i = 0, length = keys.length; i < length; i++) {
                this.set(keys[i], '', { expires: -60 * 60 * 24 });
            }
            return this;
        },

        empty: function () {
            return this.remove(getKeys(this.all()));
        },

        get: function (key, fallback) {
            fallback = fallback || undefined;
            if (isArray(key)) {
                var result = {};
                for (var i = 0, l = key.length; i < l; i++) {
                    var value = key[i];
                    result[value] = this.get(value, fallback);
                }
                return result;
            }
            else {
                var cookies = this.all(),
                    value = cookies[key];
                return value == undefined ? fallback : value;
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
        }

    },

    cookie = function (key, fallback) { 
        return _cookie.get(key, fallback);
    },

    methods = ['set', 'remove', 'empty', 'get', 'all'];

    for (var i = 0, l = methods.length; i < l; i++) { // copy all _cookie methods to cookie
        var method = methods[i];
        cookie[method] = _cookie[method];
    }

    window.cookie = cookie;

}());