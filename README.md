# Cisco Spark API for Node.js

This is a JavaScript wrapper for [Cisco Spark API](https://developer.ciscospark.com/quick-reference.html)

[![NPM](https://nodei.co/npm/node-ciscospark.png)](https://nodei.co/npm/node-ciscospark/)

[![npm](https://img.shields.io/npm/v/node-ciscospark.svg)](https://www.npmjs.com/package/node-ciscospark)[![Build Status](https://travis-ci.org/joelee/ciscospark.svg?branch=master)](https://travis-ci.org/joelee/ciscospark)[![codecov](https://codecov.io/gh/joelee/ciscospark/branch/master/graph/badge.svg)](https://codecov.io/gh/joelee/ciscospark)[![dependencies Status](https://david-dm.org/joelee/ciscospark/status.svg)](https://david-dm.org/joelee/ciscospark)


## Installation

``` sh
$ npm install node-ciscospark
```

## Usage Examples

### API
``` js
var CiscoSpark = require('node-ciscospark');

var spark = new CiscoSpark(accessToken);
```

**[Create a Message](https://developer.ciscospark.com/endpoint-messages-post.html)**
``` js
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
spark.rooms.list({
  teamId: sparkTeamId
}, function (err, result) {
  if (err) console.error(err);
  console.log(result);
});
```

## License

The MIT License (MIT)

Copyright (C) 2017 Joseph Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

[![Twitter Follow](https://img.shields.io/twitter/follow/joe_lee.svg?style=social&label=Follow)](https://twitter.com/joe_lee)
