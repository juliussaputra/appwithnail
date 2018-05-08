cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "ch.eduid.provacordovaplugin.EduIDPlugin.EduIDPlugin",
    "file": "plugins/ch.eduid.provacordovaplugin.EduIDPlugin/www/EduIDPlugin.js",
    "pluginId": "ch.eduid.provacordovaplugin.EduIDPlugin",
    "clobbers": [
      "EduIDPlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-device": "2.0.1",
  "ch.eduid.provacordovaplugin.EduIDPlugin": "1.0.0"
};
// BOTTOM OF METADATA
});