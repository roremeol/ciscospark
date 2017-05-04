# Cisco Spark API for Node.js

This is a JavaScript wrapper for [Cisco Spark API](https://developer.ciscospark.com/quick-reference.html)

[![NPM](https://nodei.co/npm/node-ciscospark.png)](https://nodei.co/npm/node-ciscospark/)

[![npm](https://img.shields.io/npm/v/node-ciscospark.svg)](https://www.npmjs.com/package/node-ciscospark) [![Build Status](https://travis-ci.org/joelee/ciscospark.svg?branch=master)](https://travis-ci.org/joelee/ciscospark) [![codecov](https://codecov.io/gh/joelee/ciscospark/branch/master/graph/badge.svg)](https://codecov.io/gh/joelee/ciscospark) [![dependencies Status](https://david-dm.org/joelee/ciscospark/status.svg)](https://david-dm.org/joelee/ciscospark) [![Known Vulnerabilities](https://snyk.io/test/github/joelee/ciscospark/badge.svg)](https://snyk.io/test/github/joelee/ciscospark)


## Installation

```bash
$ npm install node-ciscospark
```

## Quick Start

### API

```javascript
var CiscoSpark = require('node-ciscospark');

var spark = new CiscoSpark(accessToken);
```

> `accessToken` can also be set in the `CISCOSPARK_ACCESS_TOKEN` environment variable.

**[Create a Message](https://developer.ciscospark.com/endpoint-messages-post.html)**

```javascript
// spark.messages.create(parameters, callback)
spark.messages.create({
  roomId: sparkChatRoomId,
  text: 'This is a test'
}, function (err, result) {
  if (err) console.error(err);
  console.log(result);
});
```

**[List Rooms](https://developer.ciscospark.com/endpoint-rooms-get.html)**

``` js
// spark.rooms.list(parameters, callback)
spark.rooms.list({
  teamId: sparkTeamId
}, function (err, result) {
  if (err) console.error(err);
  console.log(result);
});
```

## Spark API Supported

- [Messages](https://developer.ciscospark.com/resource-messages.html)
- [People](https://developer.ciscospark.com/resource-people.html)
- [Rooms](https://developer.ciscospark.com/resource-rooms.html)
- [Memberships](https://developer.ciscospark.com/resource-memberships.html)
- [Teams](https://developer.ciscospark.com/resource-teams.html)
- [Team Memberships](https://developer.ciscospark.com/resource-team-memberships.html)
- [Webhooks](https://developer.ciscospark.com/resource-webhooks.html)

### [Messages](https://developer.ciscospark.com/resource-messages.html)

API methods | Usage
----------- | -----
[List Messages](https://developer.ciscospark.com/endpoint-messages-get.html) | `spark.messages.list(parameters, callback)`
[Create a Message](https://developer.ciscospark.com/endpoint-messages-post.html) | `spark.messages.create(parameters, callback)`
Create a Message to a Room | `spark.messages.createToRoom(roomId, markdownMessage, callback)`
Create a Message to a Person | `spark.messages.createToPersonId(personId, markdownMessage, callback)`
Create a Message to a Person's email | `spark.messages.createToPersonEmail(email, markdownMessage, callback)`
[Get Message Details](https://developer.ciscospark.com/endpoint-messages-messageId-get.html) | `spark.messages.get(messageId, callback)`
[Delete a Message](https://developer.ciscospark.com/endpoint-messages-messageId-delete.html) | `spark.messages.delete(messageId, callback)`


## License

The MIT License (MIT)

Copyright (C) 2017 Joseph Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

[![Twitter Follow](https://img.shields.io/twitter/follow/joe_lee.svg?style=social&label=Follow)](https://twitter.com/joe_lee)
