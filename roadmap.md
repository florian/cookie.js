# Roadmap for cookie.js

Some things I plan to add to cookie.js:

- [node.js](http://nodejs.org/) support. Allthough there is probably little code that has to be changed: this will take a while because I just have little node knowledge right now. (You are very welcome to contribute to the code!)
- AMD (asynchronous module definition) support. 
- Catch the security errors Chrome throws when trying to acess `document.cookie` in offline mode.
- A new method that only sets a cookie if it doesn't exist yet and then returns the value of the cookie.