var mkdirp = require('mkdirp'),
  copyFile = require('quickly-copy-file'),
  path = require('path'),
  fs = require('fs'),
  logger = require('loggy');
var filemon = (function(){
  var _0777 = parseInt('0777', 8), copiedFiles = [], logging = true;
  return {
    setLogging: function(log) {
      logging = log;
    },
    mkdir: function(target){
      var _return = true;
      mkdirp(target, this._0777, function (err) {
          if (err) _return = false;
      });
      return _return;
    },
    copyFolderRecursiveAsync: function(source, target){
      if (!fs.existsSync(target))
        this.mkdir(target);

      if (fs.lstatSync(source).isDirectory()){
        files = fs.readdirSync(source);
        files.forEach(function (file) {
          var curSource = path.join(source, file);
          if (fs.lstatSync(curSource).isDirectory()){
            var curTarget = path.join(target, path.basename(curSource));
            filemon.copyFolderRecursiveAsync(curSource, curTarget);
          }else{
            filemon.copyFileAsync(curSource, target);
          }
        });
      }else{
        this.copyFileAsync(source, target);
      }
    },
    copyFileAsync: function(original, copy){
      _copyFile = path.join(copy, path.basename(original));
      copiedFiles.push(_copyFile);
      copyFile(original, _copyFile, function(error) {
        if (error)
          console.error(error, ' que error!!!');
        else{
          if(logging){
            logging = false; //just print the current file, or else the recursion makes it print the whole collection
            copiedFiles.forEach(function(file){
              logger.info('copied ' + file);
            });
          }

        }
      });
    }
  }
})();

module.exports = filemon;
