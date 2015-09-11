# node-dataStream

Simple and Powerful data stream on Node.js IO.

## Installation

You just install it from [npm](http://npmjs.com).

```shell
npm install dataStream
```

And then use it!

## Usage

You can use dataStream to control any stream like [jQuery Ajax](http://api.jquery.com/jQuery.ajax/).

```js
// Simple Stream
var dataStream = require('dataStream');
var fs         = require('fs');

var stream = new dataStream();
stream.on('complete', function(body) {
  // Do with the loaded data
});

fs.createReadStream(__dirname + '/example.txt').pipe(stream);/* .pipe(anyStream); */
```


You can also use it control the data in any stream before it flow to the next stream.

```js
var dataStream = require('dataStream');
var fs         = require('fs');

var stream = new dataStream({
  data: function(chunk) {
    // convert the Buffer to a String
    chunk = chunk.toString();
    chunk += '\n';

    return chunk;
  }
});

fs.createReadStream(__dirname + '/example.txt').pipe(stream);
```

Of course, you can set the properties `writable` and `readable` too.

```js
// Simple Stream
var dataStream = require('dataStream');
var fs         = require('fs');

var stream = new dataStream({ readable: false });
stream.on('complete', function(body) {
  // Do with the loaded data
});

fs.createReadStream(__dirname + '/example.txt').pipe(stream); /* the stream can not pipe to any other stream */
```

## API

### Properties

#### writable [true/false]

If this property is true, it will make the stream can not be writed.

```js
var dataStream = require('dataStream');

var stream = new dataStream({ writable: false });
```

#### readable [true/false]

Now the stream can not pipe to any other stream.

```js
var dataStream = require('dataStream');

var stream = new dataStream({ readable: false });
```

#### data [Function]

The property can make the stream be a custom process factory.

```js
var dataStream = require('dataStream');

var stream = new dataStream({
  data: function(chunk) {
    // Do something with the chunk object
    return chunk;
  }
});
```

---

### Methods

#### .write(data)

Put some data into the stream and fire a `'data'` event with the data.

```js
stream.write('Will Wen Gunn is a baka!');
```

### .end(data)

End the stream flows and fire a `'end'` event.

```js
stream.end();
// stream.end('End');
```

### .body()

Return the data which the stream received.

```js
stream.write('DATA');
stream.end('DATA');

stream.body().toString(); //-> DATADATA
```

### .pause()

Copied from Node.js offical documentation.

Issues an advisory signal to the underlying communication layer, requesting that no further data be sent until `resume()` is called.

Note that, due to the advisory nature, certain streams will not be paused immediately, and so `'data'` events may be emitted for some indeterminate period of time even after `pause()` is called. You may wish to buffer such `'data'` events.

### .resume()

Copied from Node.js offical documentation.

Resumes the incoming `'data'` events after a `pause()`.

### .destory()

Copied from Node.js offical documentation.

Closes the underlying file descriptor. Stream is no longer writable nor readable. The stream will not emit any more 'data', or 'end' events. Any queued write data will not be sent. The stream should emit 'close' event once its resources have been disposed of.

### .pipe(destination, [options])

Copied from Node.js offical documentation.

* `destination` {Writable Stream}
* `options` {Object} Optional
  * `end` {Boolean} Default=true

Connects this readable stream to `destination` WriteStream. Incoming
data on this stream gets written to `destination`.  Properly manages
back-pressure so that a slow destination will not be overwhelmed by a
fast readable stream.

This function returns the `destination` stream.

For example, emulating the Unix `cat` command:

    process.stdin.pipe(process.stdout);

By default `end()` is called on the destination when the source stream
emits `end`, so that `destination` is no longer writable. Pass `{ end:
false }` as `options` to keep the destination stream open.

This keeps `writer` open so that "Goodbye" can be written at the
end.

    reader.pipe(writer, { end: false });
    reader.on("end", function() {
      writer.end("Goodbye\n");
    });

Note that `process.stderr` and `process.stdout` are never closed until
the process exits, regardless of the specified options.

---

### Events

#### data (chunk {Buffer})

When some data is put into the stream, a `'data'` event would be fired.

```js
var dataStream = require('dataStream');

var stream = new dataStream();

stream.on('data', function(chunk) {
  // Foobar
});
```

#### end

When a `.end()` called, a `'end'` event would be fired.

```js
var dataStream = require('dataStream');

var stream = new dataStream();

stream.on('end', function() {
  // Foobar
});
```

#### complete (body {String})

When the stream is completed, a `'complete'` event would be fired.

```js
var dataStream = require('dataStream');

var stream = new dataStream();

stream.on('complete', function(body) {
  // Do something with the data
});
```

## License

(The BSD License)

    Copyright 2013 (c) Will Wen Gunn willwengunn@gmail.com

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.