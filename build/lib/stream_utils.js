'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _string_decoder = require('string_decoder');

var _buffertools = require('buffertools');

/** Safe handler; log exceptions */

var _buffertools2 = _interopRequireDefault(_buffertools);

function safe(x) {
  return function () {
    try {
      x.apply(null, arguments);
    } catch (ex) {
      console.log(ex.stack);
    }
  };
};

/**
 * Invoke the callback after reading from the stream and converting the result to a string
 * @param stream A stream to read from.
 * @param callback The callback to run when done.
 */
exports.read_from_stream = function (stream, callback) {
  var bufs = [];
  stream.on('readable', safe(function () {
    var read = stream.read();
    if (read) {
      if (read.contents) {
        bufs.push(read.contents);
      } else {
        bufs.push(read);
      }
    }
  }));
  stream.on('end', safe(function () {
    var all = _buffertools2['default'].concat.apply(null, bufs);
    var decoder = new _string_decoder.StringDecoder('utf8');
    var content = decoder.write(all);
    callback(content);
  }));
};

/**
 * Invoke the callback after getting a file from the stream.
 * @param stream A stream to read from.
 * @param callback The callback to run when done.
 */
exports.read_files_from_stream = function (stream, callback) {
  var files = [];
  stream.on('readable', safe(function () {
    var read = stream.read();
    if (read) {
      files.push(read);
    }
  }));
  stream.on('end', safe(function () {
    callback(files);
  }));
};

/**
 * Decode a buffer of utf8 data into a string
 * @param buffer A node Buffer to process.
 * @param enc The encoding to use for the buffer.
 */
exports.convert_to_string = function (buffer, enc) {
  var decoder = new _string_decoder.StringDecoder(enc);
  var content = decoder.write(buffer);
  return content;
};