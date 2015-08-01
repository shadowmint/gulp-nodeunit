'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpTools = require('gulp-tools');

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var GulpNodeUnit = (function (_Plugin) {
  _inherits(GulpNodeUnit, _Plugin);

  function GulpNodeUnit() {
    _classCallCheck(this, GulpNodeUnit);

    _get(Object.getPrototypeOf(GulpNodeUnit.prototype), 'constructor', this).call(this, 'gulp-nodeunit');
    this.files = [];
  }

  _createClass(GulpNodeUnit, [{
    key: 'handle_string',
    value: function handle_string(file, value, callback) {
      this.files.push(file.path);
      callback();
    }
  }, {
    key: 'handle_close',
    value: function handle_close(target, callback) {
      var _this = this;

      var runner = _path2['default'].resolve(__dirname + '/../node_modules/nodeunit/bin/nodeunit');
      console.log(runner);
      console.log(this.files);
      var child = _child_process2['default'].exec('node ' + runner + ' ' + this.files.join(' '));
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
      child.on('exit', function (data) {
        _this.files = [];
        if (data) {
          var err = new _gulpUtil2['default'].PluginError(_this.name, "Tests failed");
          callback(err);
        }
        callback();
      });
    }
  }]);

  return GulpNodeUnit;
})(_gulpTools.Plugin);

exports['default'] = new GulpNodeUnit().handler();
module.exports = exports['default'];