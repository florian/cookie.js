#  cookie.js–simplifying cookies in JavaScript [![Build Status](https://travis-ci.org/js-coder/cookie.js.png?branch=master)](https://travis-ci.org/js-coder/cookie.js)

cookie.js is a tiny JavaScript library that simplifies cookies. It is capable of setting, getting and removing cookies, accepts a variety of parameters, and supports chaining. cookie.js is released under the [MIT/X11 license](https://github.com/js-coder/cookie.js/blob/master/license). It doesn't have any dependencies and minified and gzipped it's only 0.9 KB small.

## Why would you want to use it?
Working with cookies in JavaScript sucks. `document.cookie` is definitely one of the ugly parts of JavaScript. This library aims to provide an easy and nevertheless powerful way to use cookies.

## Usage

Download [cookie.min.js](https://raw.github.com/js-coder/cookie.js/master/cookie.min.js) and include it in your HTML document:

```html
<script src="cookie.min.js"></script>
```

If you include cookie.js as above, this script will add an object called `cookie` to your global scope.

---

cookie.js also supports AMD and CommonJS. So if you want to include cookie.js dynamically, you can just require it with any AMD / CommonJS loader, for example [RequireJS](http://requirejs.org/) for AMD.
Follow the instructions of your loader to include cookie.js.

---

After that you can call any of methods that are explained in the following.

## cookie.set()
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

If you need more options, like setting the expiry date, you can add an object with options as the third parameter:

```javascript
cookie.set('key', 'value', {
   expires: 7, // expires in one week
});

cookie.set({
	key1: 'value1',
	key2: 'value2',
	{
		expires: 7
	}
})
```

The following fields can be added to the mentioned object:

| key | value | default value |
|:--|:--|:--|
| `expires` |  Either a `number` containing the days until the expiry, a date in the `GMTString` format or a `date object`. | Expires when the browser is closed. |
| `domain` |  A `string` that specifies the domain that can access the cookie. | The current domain. |
| `path` | A `string` that limits the access of the cookie to that path. | The current path. |
| `secure` | A `boolean` indicating whether the cookie shall only be accessable over a secure connection or not. | `false` |
| `raw` | A `boolean` value indicates if the cookie value should be returned decoded or raw. | `false` |

You can customize the default settings by manipulating `cookie.defaults`.

```javascript
cookie.defaults.expires = 7;
cookie.defaults.secure = true;
```

Most people will prefer specifying the expiry date in days, but if you want to specify the expiry date in minutes, then you can configure `cookie.expiresMultiplier`:

```javascript
cookie.expiresMultiplier = 60; // Seconds.
cookie.expiresMultiplier = 60 * 60; // Minutes.
cookie.expiresMultiplier = 60 * 60 * 24; // Hours.
```

## cookie.get()
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

## cookie.all()

```javascript
var cookies = cookie.all();
```

To get all of the currently saved cookies simply call `cookie.all`. In this case the variable `cookies` will return an object with all the current cookies.

## cookie.remove()

This method allows you to remove cookies. It accepts an infinite number of keys or an array of keys.

```javascript
cookie.remove('key');
cookie.remove('key1', 'key2');
cookie.remove(['key1', 'key2']);
```

## cookie.empty()

Sometimes you may want to remove all cookies. Simply call `cookie.empty()` and every cookie will be removed.

## cookie.enabled()

This method allows you to test if the cookies are enabled. It returns `true` if you can work with cookies and `false` if you cannot. You might want to use a fallback if they are disabled:

```javascript
if (cookie.enabled()) {
   // Do stuff with cookies
} else {
   // Display error message or use localStorage
}
```

## Chaining

The methods `set`, `remove` and `empty` return the cookie object and therefore enable chaining.

```javascript
cookie.empty().set('key1', 'value1').set('key2', 'value2').remove('key1');
```

- - -

## Wiki pages

- [Contribute](https://github.com/js-coder/cookie.js/wiki/Contribute)
- [Changelog](https://github.com/js-coder/cookie.js/wiki/Changelog)