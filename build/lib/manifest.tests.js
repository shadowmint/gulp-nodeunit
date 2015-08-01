'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test_emit_manifest = test_emit_manifest;
exports.test_configure_root = test_configure_root;
exports.test_configure_bootstrap = test_configure_bootstrap;
exports.test_configure_prefix = test_configure_prefix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _manifest = require('./manifest');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function test_emit_manifest(test) {
  var m = new _manifest.Manifest();
  m.push('foo', 'foo');
  m.push('bar', 'bar');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo == 'foo');
  test.ok(y.bar == 'bar');
  test.done();
}

function test_configure_root(test) {
  var m = new _manifest.Manifest();
  m.configure({ root: 'foo/bar' });
  m.push(_path2['default'].resolve('foo/bar/foo'), 'foo');
  m.push(_path2['default'].resolve('foo/bar/foo/bar'), 'bar');
  var x = m.emit();
  var y = eval(x);
  test.ok(y['foo'] == 'foo');
  test.ok(y['foo/bar'] == 'bar');
  test.done();
}

function test_configure_bootstrap(test) {
  var m = new _manifest.Manifest();
  m.configure({ root: './', bootstrap: 'bootstrap', bootsym: 'boot' });
  m.push(_path2['default'].resolve('foo'), 'foo');
  m.push(_path2['default'].resolve('bar'), 'bar');
  m.push(_path2['default'].resolve('bootstrap'), 'function boot(x) { return x; }');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo == 'foo');
  test.ok(y.bar == 'bar');
  test.done();
}

function test_configure_prefix(test) {
  var m = new _manifest.Manifest();
  m.configure({ root: './', 'export': 'prefix' });
  m.push(_path2['default'].resolve('foo'), 'foo');
  m.push(_path2['default'].resolve('bar'), 'bar');
  var x = m.emit();
  test.ok(x.indexOf('var prefix =') == 0);
  test.done();
}