Bootscrap
=========

I'm *sure* something like this already exists, but I couln't find it quickly so I made (another?) one myself.

This is basically an NPM package with the express purpose of providing programmatic access to [Bootstrap](http://getbootstrap.com/) and [Bootswatch](http://bootswatch.com/) CSS files.

Usage
-----

```javascript
var bs = require('bootscrap');

bs.css()           // gets the CSS for the default, minified bootstrap.min.css
bs.css('flatly')   // gets the CSS for the 'Flatly' Bootswatch theme
bs.css('readable') // etc., etc.
```

Knock yourselves out.
