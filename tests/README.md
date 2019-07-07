# cookie.js – Test suite

cookie.js uses the [mocha](http://visionmedia.github.com/mocha) testing framework and the [chai](http://chaijs.com) assertion library

## Running the test

- Using the mocha with jsdom.

  ```sh
  $ git clone git://github.com/florian/cookie.js.git && cd cookie.js
  $ npm install # Install grunt dependencies
  $ npm test
  ```

*Currently there are no tests for the [`cookie.set`](https://github.com/florian/cookie.js#cookieset) options object, you're welcome to contribute!*
