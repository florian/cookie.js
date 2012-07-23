# cookie.js changelog

cookie.js is a micro library. That's why I've decided not to number the versions like the large libraries do. The changelog doesn't contain very minor updates that didn't change the API (like: "Added some comments."). Take a look at the [commit history](https://github.com/js-coder/cookie.js/commits/master) for a detailed list of changes.

**Thu Jul 19**

  - Added CommonJS support.
  - Added `cookie.defaults` to customize the default options.
  - Added `cookie.expiresMultiplier` so users can customize it and e.g. pass the number of minutes after that the cookie expires to `cookie.set` instead of the number of hours.
  - Added a more efficient escape method.
  - Replaced rake with grunt.
  - Replaced Google Closure Compiler with UglifyJS, because grunt ships with UglifyJS and it nearly does the same amount of compression (currently 60 bytes more than GCC when gzipped, which is fine.).

**Sat May 12**

  - Added AMD support.

**Sat May 5**

  - Added unit tests.

**Mon Apr 23**

  - Bugfix – Added escaping for the cookie key.
  - Bugfix – `cookie.remove` didn't work in IE, now it does.
  - Large parts of the `utils` methods were rewritten.

**Sat Apr 14:**

  - The `expiry` option now expects you to pass the number of days instead of the number of the seconds.

**Fri Apr 13**

  - Rewrote the code base architecture, it's a lot more efficient now.

**Tue Apr 10**

  - The Google Closure Compiler is now being used to compress the code, because it works better for cookie.js than other compressors do.
  - Added: New method `cookie.enabled` that checks if cookies are enabled.

**Tue Apr 3**

  - Major erformance optimisation for retrieving several cookies at once with `cookie.get`.

**Fri Mar 23**

  - Bugfix – The `utils.isArray` / `utils.isPlainObject` methods now work in IE.

**Thu Mar 22**

  - Published cookie.js on GitHub.