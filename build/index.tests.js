'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test_with_buffer = test_with_buffer;
exports.test_with_stream = test_with_stream;
exports.test_with_invalid_stream = test_with_invalid_stream;
exports.test_with_no_options = test_with_no_options;
exports.test_with_valid_output_option = test_with_valid_output_option;
exports.test_with_invalid_output_option = test_with_invalid_output_option;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libStream_utilsJs = require('./lib/stream_utils.js');

var _libStream_utilsJs2 = _interopRequireDefault(_libStream_utilsJs);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

function test_with_buffer(test) {
  test.expect(2);

  var file1 = new _vinyl2['default']({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new _vinyl2['default']({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = (0, _index2['default'])();
  _libStream_utilsJs2['default'].read_from_stream(stream, function (value) {
    var value = eval(value);
    test.ok(value['source1.js'] == 'Hello');
    test.ok(value['source2.js'] == 'World');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_stream(test) {
  test.expect(2);

  var file1 = new _vinyl2['default']({
    path: 'source1.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: _fs2['default'].createReadStream('./tests/source1.js')
  });
  var file2 = new _vinyl2['default']({
    path: 'source2.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: _fs2['default'].createReadStream('./tests/source2.js')
  });

  var stream = (0, _index2['default'])();
  _libStream_utilsJs2['default'].read_from_stream(stream, function (value) {
    var value = eval(value);
    test.ok(value['source1.js'] == 'Hello\n');
    test.ok(value['source2.js'] == 'World\n');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_invalid_stream(test) {
  test.expect(1);

  var file1 = new _vinyl2['default']({
    path: 'source3.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: _fs2['default'].createReadStream('./tests/source3.js')
  });

  var stream = (0, _index2['default'])();
  stream.on('error', function (err) {
    test.ok(true);
    test.done();
  });
  _libStream_utilsJs2['default'].read_from_stream(stream, function (value) {
    test.ok(false); // Unreachable
  });

  stream.write(file1);
  stream.end();
}

function test_with_no_options(test) {
  test.expect(2);

  var file1 = new _vinyl2['default']({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new _vinyl2['default']({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = (0, _index2['default'])();
  _libStream_utilsJs2['default'].read_files_from_stream(stream, function (files) {
    test.ok(files.length == 1);
    test.ok(files[0].path = 'combined.js');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_valid_output_option(test) {
  test.expect(2);

  var file1 = new _vinyl2['default']({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new _vinyl2['default']({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = (0, _index2['default'])({ output: 'junk.js' });
  _libStream_utilsJs2['default'].read_files_from_stream(stream, function (files) {
    test.ok(files.length == 1);
    test.ok(files[0].path = 'junk.js');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_invalid_output_option(test) {
  try {
    var stream = (0, _index2['default'])({ output: null });
    test.ok(false); // Unreachable
  } catch (err) {
    test.ok(true);
    test.done();
  }
}