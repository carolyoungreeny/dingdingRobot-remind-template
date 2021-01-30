/* eslint valid-jsdoc: "off" */

'use strict';
const clientMysql = require('../app/models');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611301575327_6809';


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

 

  return {
    ...config,
    ...userConfig,
  };
};
