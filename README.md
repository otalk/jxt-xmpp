# JXT-XMPP

This is a collection of [JXT (JSON/XML translator)](https://github.com/otalk/jxt) definitions for [XMPP](http://xmpp.org).

These definitions were originally part of the [Stanza.io](https://stanza.io) XMPP library, but have been split off into their own module so that they can be used with other projects (such as the [node-xmpp](http://node-xmpp.org) family of libraries).

## Getting Started

The basic boilerplate to start using the XMPP definitions is:

```js
// Create registry and load required helper plugin
var JXT = require('jxt').createRegistry();
JXT.use(require('jxt-xmpp-types'));

// Load the XMPP definitions
JXT.use(require('jxt-xmpp'));

var stanza = JXT.parse('<message xmlns="jabber:client"><body>Hi!</body></message>');
console.log(stanza.body);
// -> Hi!

var Message = JXT.getMessage();
var msg = new Message({ body: 'Hey' });
console.log(msg.toString());
// -> '<message xmlns="jabber:client"><body>Hey</body></message>'
```

Here we created our [JXT](https://github.com/otalk/jxt) registry, and first loaded the [jxt-xmpp-types](https://github.com/otalk/jxt-xmpp-types) plugin to provide some required JXT helper types and methods.

With that bit of setup out of the way, we can load the `jxt-xmpp` module itself.

## License

MIT

## Created By

If you like this, follow [@lancestout](http://twitter.com/lancestout) on twitter.
