cordova.define("ch.htwchur.nailpluginswift.nailpluginswift", function(require, exports, module) {
var exec = require('cordova/exec');

var PLUGIN_NAME = 'NailPluginSwift';

var NailPluginSwift = {
  login: function(phrase, cb) {
    exec(cb, null, PLUGIN_NAME, 'login', [phrase]);
  }
};

module.exports = NailPluginSwift;

});
