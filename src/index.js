import gutil from 'gulp-util';
import {Plugin} from 'gulp-tools';
import cp from 'child_process';
import path from 'path';

class GulpNodeUnit extends Plugin {

  constructor() {
    super('gulp-nodeunit');
    this.files = [];
  }

  handle_string(file, value, callback) {
    this.files.push(file.path);
    callback();
  }

  handle_close(target, callback) {
    cp.exec('npm bin', (error, stdout, stderr) => {
      if (error !== null) {
        var err = new gutil.PluginError(this.name, `Unable to locate bin folder: ${error}`);
        callback(err);
      }
      else {
        var bin_folder = stdout.trim();
        var runner = path.resolve(`${bin_folder}/nodeunit`);
        var child = cp.exec(`node ${runner} ${this.files.join(' ')}`);
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        child.on('exit', (data) => {
          this.files = [];
          if (data) {
            var err = new gutil.PluginError(this.name, "Tests failed");
            callback(err);
          }
          callback();
        });
      }
    });


  }
}

export default new GulpNodeUnit().handler();
