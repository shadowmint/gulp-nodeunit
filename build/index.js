'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpTools = require('gulp-tools');

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GulpNodeUnit = (function (_Plugin) {
  _inherits(GulpNodeUnit, _Plugin);

  function GulpNodeUnit() {
    _classCallCheck(this, GulpNodeUnit);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GulpNodeUnit).call(this, 'gulp-nodeunit'));

    _this.files = [];
    return _this;
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
      var _this2 = this;

      _child_process2.default.exec('npm bin', function (error, stdout, stderr) {
        if (error !== null) {
          var err = new _gulpUtil2.default.PluginError(_this2.name, 'Unable to locate bin folder: ' + error);
          callback(err);
        } else {
          var isWin = /^win/.test(process.platform);
          var bin_folder = stdout.trim();
          var runner = _path2.default.resolve(bin_folder + '/nodeunit');
          if (isWin) {
            runner += '.cmd';
          }
          var child = _child_process2.default.exec(runner + ' ' + _this2.files.join(' '));
          child.stdout.pipe(process.stdout);
          child.stderr.pipe(process.stderr);
          child.on('exit', function (data) {
            _this2.files = [];
            if (data) {
              var err = new _gulpUtil2.default.PluginError(_this2.name, "Tests failed");
              callback(err);
            }
            callback();
          });
        }
      });
    }
  }]);

  return GulpNodeUnit;
})(_gulpTools.Plugin);

exports.default = new GulpNodeUnit().handler();