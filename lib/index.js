var params={}, filemon = require('./filemon'), 
  logger = require('loggy'), copyfilemon = function(config) {params = config;}
copyfilemon.prototype.brunchPlugin = true;
copyfilemon.prototype.type='javascript';
copyfilemon.prototype.extension='js';

copyfilemon.prototype.onCompile = function(data, path, callback) {
  filemon.setLogging(params.plugins.copyfilemon['logging'] ? params.plugins.copyfilemon['logging'] : false);
  Object.keys(params.plugins.copyfilemon).forEach(function(key){  
    var destination = key;
    var directories = params.plugins.copyfilemon[key];  
    if(typeof destination === 'string' && (typeof directories === 'string' || typeof directories === 'object')) {
      if(typeof directories === 'string'){
        filemon.copyFolderRecursiveAsync(directories, params.paths.public + '/' + destination);
      }else{
		directories.forEach(function(directory) {
			filemon.copyFolderRecursiveAsync(directory, params.paths.public + '/' + destination);
		});        
      }
    }
  });
};

module.exports = copyfilemon;
