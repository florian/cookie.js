#  cookie.js – simplifying cookies in JavaScript [![Build Status](https://travis-ci.org/florian/cookie.js.png?branch=master)](https://travis-ci.org/florian/cookie.js)

cookie.js is a tiny JavaScript library that simplifies cookies. It is capable of setting, getting and removing cookies, accepts a variety of parameters, and supports chaining.  It doesn't have any dependencies and minified+gzipped it's only 0.9 KB small.

## Why would you want to use it?
Working with cookies in JavaScript sucks. `document.cookie` is definitely one of the ugly parts of JavaScript. This library aims to provide an easy and nevertheless powerful way to use cookies.

## Usage

Download [cookie.umd.min.js](https://raw.github.com/florian/cookie.js/master/dist/cookie.umd.min.js) and include it in your HTML document, this will add a global object called `cookie`:

```html
<script src="cookie.umd.min.js"></script>
```

Alternatively you can use a JavaScript package manager to add it to your project:
```sh
$ bower install cookie --save
$ npm install cookie_js --save
```

---

cookie.js supports AMD and CommonJS. So if you want to include cookie.js dynamically, you can just require it with any AMD / CommonJS loader, for example [RequireJS](http://requirejs.org/) for AMD.
Follow the instructions of your loader to include cookie.js.

---

After that you can call any of methods that are explained in the following.

## cookie.set
You can use the `cookie.set` method to set cookies. The value will automatically be escaped for you.

```javascript
cookie.set('key', 'value');
```

*Note: Values will be casted to string, so setting a number will work. However, the value will be a string when getting the cookie.*

You can also set several values at once:

```javascript
cookie.set({
   key1: 'value1',
   key2: 'value2'
});
```

If you need more options, like setting the expiry date, you can add an object with options as the last parameter:

```javascript
cookie.set('key', 'value', {
   expires: 7, // expires in one week
});

cookie.set({
   key1: 'value1',
   key2: 'value2'
}, {
   expires: 7
})
```

The following fields can be added to the mentioned object:

| key | value | default value |
|:--|:--|:--|
| `expires` |  Either a `number` containing the days until the expiry, a date in the `UTCString` format or a `date object`. | Expires when the browser is closed. |
| `domain` |  A `string` that specifies the domain that can access the cookie. | The current domain. |
| `path` | A `string` that limits the access of the cookie to that path. | The current path. |
| `secure` | A `boolean` indicating whether the cookie shall only be accessible over a secure connection or not. | `false` |
| `sameSite` | A `string` that specifies SameSite attribute that restricts cookie access based on the site context. | `null` |

You can customize the default settings by manipulating `cookie.defaults`.

```javascript
cookie.defaults.expires = 7;
cookie.defaults.secure = true;
```

Most people will prefer specifying the expiry date in days, but if you want to specify the expiry date in minutes, then you can configure `cookie.expiresMultiplier`:

```javascript
cookie.expiresMultiplier = 1; // Seconds
cookie.expiresMultiplier = 60; // Minutes.
cookie.expiresMultiplier = 60 * 60; // Hours.
cookie.expiresMultiplier = 60 * 60 * 24; // Days(default).
```

## cookie.get
This method allows you to retrieve your cookies, you can use it by simply passing the key of the cookie:

```javascript
cookie.get('key');
```

Passing just one key like this will return a string, containing the value of the cookie. You can also pass an array of keys:

```javascript
cookie.get(['key1', 'key2']);
```

This will always return an object. The keys of this object will be the keys you passed and the values are the corresponding values.

In case you want to add a default value you can use the second parameter. The default value will be returned if the cookie*(s)* could not be found:

```javascript
cookie.get('key', 'default value');
```

This also works with several keys:

```javascript
cookie.get(['key1', 'key2'], 'default value');
```

`cookie()` is a shortcut for `cookie.get()`.

```javascript
cookie.get('key');
// is the same as
cookie('key');
```

## cookie.all

```javascript
var cookies = cookie.all();
```

To get all of the currently saved cookies simply call `cookie.all`. In this case the variable `cookies` will return an object with all the current cookies.

## cookie.remove

This method allows you to remove cookies. It accepts an infinite number of keys or an array of keys.

```javascript
cookie.remove('key');
cookie.remove('key1', 'key2');
cookie.remove(['key1', 'key2']);
```

## cookie.empty

Sometimes you may want to remove all cookies. Simply call `cookie.empty()` and every cookie will be removed.

## cookie.enabled

This method allows you to test if the cookies are enabled. It returns `true` if you can work with cookies and `false` if you cannot. You might want to use a fallback if they are disabled:

```javascript
if (cookie.enabled()) {
   // Do stuff with cookies
} else {
   // Display error message or use localStorage
}
```

## cookie.setDefault

This method works just like `cookie.set` and accepts the same arguments, but it
only sets those cookies that don't have a value yet allowing you to specify
default values.

```javascript
cookie.set('a', '1');
cookie.setDefault({
   a: '2',
   b: '2'
});

cookie.get(['a', 'b']); // {a: "1", b: "2"}
```

## cookie.removeSpecific

If you want to remove cookies that were set with custom options (e.g. specifing
`domain` or path) then those are also needed to remove the cookie. This library
can't automatically specify those for you because you might've set the cookie on
the server and the JS cookie API doesn't offer a way to retrieve this
information.

```javascript
cookie.set('a', 'b', { path: '/somepath' });

// This won't work
cookie.remove('a');

// You have to do this
cookie.removeSpecific('a', { path: '/somepath' });

// You can also give an array of cookie keys
cookie.removeSpecific(['a', 'b'], { path: '/somepath' });
```

This can be pretty annoying. So in case you would need to do this a lot it's
suggested to just change `cookie.defaults` as explained in the `cookie.set`
documentation. The default options are used by `remove` and `removeSpecific` as
well.

## Chaining

The methods `set`, `remove`, `empty`, `setDefault`, `removeSpecific` return the cookie object and therefore enable chaining.

```javascript
cookie.empty().set('key1', 'value1').set('key2', 'value2').remove('key1');
```

## A word on encoding

cookie.js sensibly encodes / decodes values and should work just fine with most
server side frameworks. However sometimes there are weird server side encodings,
for example PHP escapes spaces with `+` for historic reasons.
This library can't handle all of those cases at the same time so if you notice
you need a custom decoding function you can overwrite `cookie.utils.decode`.

```javascript
// For example
cookie.utils.decode = function (value) {
   return decodeURIComponent(value).replace('+', ' ');
};
```

For a decoding function for ColdFusion, see issue [#49](https://github.com/florian/cookie.js/issues/49).

- - -

## Wiki pages

- [Contribute](https://github.com/florian/cookie.js/wiki/Contribute)
- [Changelog](https://github.com/florian/cookie.js/wiki/Changelog)
