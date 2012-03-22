#  cookie.js – simplifying JavaScript cookies
cookie.js is a tiny JavaScript library that simplifies cookies. It's capable of setting, getting and removing cookies, accepts a variety of parameters and supports chaining. cookie.js is released under the MIT/X11 license. It doesn't have any dependencies and if minified it's only ~1.4 KiB large.

This script will add an object called `cookie` to your global scope. 

## Why would you want to use it?
Working with cookies in JavaScript sucks. `document.cookie` is definitely one of the ugly parts of JavaScript. This library aims to simplify working with cookies and make them more fun to use.

## cookie.set()
You can use the `cookie.set` method to set cookies. The value will automatically escaped for you.

    cookie.set('key', 'value');

You can also set several values at once:

    cookie.set({
        key1: 'value1',
        key2: 'value2'
    });

If you need more options, like setting the expiry date, you can add an object with options as the 3rd parameter:

    cookie.set('key', 'value', {
        expires: 60 * 60 * 7, // expires in one week
    });

The following fields can be added to the options object:

 - `expires`: Either a number containing the seconds until the expiry, a
   date in the GMTString format or a date object. (e.g.: `60 * 60 * 24 * 7` for a week.)
 - `domain`: Allow other domains to access your cookie. (e.g.: `example.com`.)
 - `path`: Limit the access to the cookie to some path. (e.g.: `dir/`.)
 - `secure`: A boolean indicating whether the cookie shall only be accessable over a secure connection.

## cookie.get()
This method allows you to retrieve your cookies, you can use it by simply passing the key of the cookie:

    cookie.get('key');

Passing just one key like this will return a string, containing the value of the cookie. You can also pass an array of keys:

    cookie.get['key1', 'key2']);

This will always return an object. The keys of this object will be the keys you passed and the values are the corresponding values.

In case you want to add a default value you can use the second parameter. The default value will be returned if the cookie*(s)* could not be found:

    cookie.get('key', 'default value');

This also works with several keys:

    cookie.get(['key1', 'key2'], 'default value');

`cookie()` is a shortcut for `cookie.get()`. 

    cookie.get('key'); 
    // is the same as
    cookie('key');

## cookie.all()

To get all of the currently saved cookies simply use `cookie.all`. It will return an object containing all the current cookies.

## cookie.remove()

This method allows you to remove cookies. It accepts an infinite number of keys or an array of keys.

    cookie.remove('key');
    cookie.remove('key1', 'key2');
    cookie.remove(['key1', 'key2']);

## cookie.empty()

If you want to remove all cookies, this method is for you. Simply call `cookie.empty()` and all the cookies will be removed.

## Chaining

The methods `set`, `remove` and `empty` return the cookie object and therefore enable chaining. 

    cookie.empty().set('key', 'value').set('key2', 'value2').remove('key1');

## Contribute

If you find any bugs in this script or have ideas how to improve it please let me know. You are also very welcome to contribute to the code here on github.