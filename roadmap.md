# Roadmap for cookie.js

Some things I plan to add to cookie.js:

- [node.js](http://nodejs.org/) and CommonJS support. Allthough there is probably little code that has to be changed: this will take a while because I just have little node knowledge right now. (You are very welcome to contribute to the code!)
- A new method that only sets a cookie if it doesn't exist yet and then returns the value of the cookie.
- Only escape `,`, `;`, `"`, `\`, `=` and whitespace characters when setting a cookie instead of URL encoding and decoding. Not all of the characters that need to be escaped for URLs need to be escaped for cookies, so URL encoding can make the cookie unnecessary bigger.