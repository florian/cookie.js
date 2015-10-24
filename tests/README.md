# cookie.js – Test suite

cookie.js uses the [mocha](http://visionmedia.github.com/mocha) testing framework and the [chai](http://chaijs.com) assertion library

## Running the tests

There are several ways to run the tests:

- Using a web server and by visiting the *tests/index.html* in your browser.

  ```sh
  $ git clone git://github.com/florian/cookie.js.git && cd cookie.js
  $ python -m SimpleHTTPServer 4321 # Or using something similiar to start a web server
  $ open localhost:4321
  ```

- Using the grunt build system and PhantomJS.

  ```sh
  $ git clone git://github.com/florian/cookie.js.git && cd cookie.js
  $ npm install # Install grunt dependencies
  $ grunt test # Run the tests
  ```

*Currently there are no tests for the [`cookie.set`](https://github.com/florian/cookie.js#cookieset) options object, you're welcome to contribute!*
