'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

/** A manifest of all processed content */

var _path2 = _interopRequireDefault(_path);

var Manifest = (function () {

  /** The set of content items, by name */

  function Manifest() {
    _classCallCheck(this, Manifest);

    this.contents = {};
    this.options = {};
    this.bootstrap = null;
  }

  /** Configure options for this */

  _createClass(Manifest, [{
    key: 'configure',
    value: function configure(options) {
      this.options = options;
      if (this.options.root) {
        this.options.root = _path2['default'].resolve(this.options.root) + '/';
      }
    }

    /**
     * Push content into the manfiest
     * If any root is configured, remove it from the given name value.
     * If the bootstrap is passed, do not add to content, and save.
     */
  }, {
    key: 'push',
    value: function push(name, value) {
      if (this.options.root) {
        if (name.indexOf(this.options.root) == 0) {
          var len = this.options.root.length;
          name = name.substring(len, name.length);
        }
      }
      if (name && this.options.bootstrap && name == this.options.bootstrap) {
        this.bootstrap = value;
        this.bootsym = this.options.bootsym;
      } else {
        this.contents[name] = value;
      }
    }

    /**
     * Emit a single javascript block
     * If any bootstrap is specified, run it on the result.
     */
  }, {
    key: 'emit',
    value: function emit() {
      var json = JSON.stringify(this.contents);
      var prefix = this.options['export'] ? 'var ' + this.options['export'] + ' = ' : '';
      var output = '(function() { return ' + json + '; })();';
      if (this.bootstrap) {
        output = '(function() { ' + this.bootstrap + '; return ' + this.bootsym + '(' + json + '); })();';
      }
      output = prefix + output;
      return output;
    }
  }]);

  return Manifest;
})();

exports.Manifest = Manifest;