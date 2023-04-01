"use strict";

const { PuppeteerExtraPlugin } = require("puppeteer-extra-plugin");

/**
 * Launch puppeteer with arbitrary user preferences.
 *
 * The user defined preferences will be merged with preferences set by other plugins.
 * Plugins can add user preferences by exposing a data entry with the name `userPreferences`.
 *
 * Overview:
 * https://chromium.googlesource.com/chromium/src/+/master/chrome/common/pref_names.cc
 *
 * @param {Object} opts - Options
 * @param {Object} [opts.userPrefs={}] - An object containing the preferences.
 *
 * @example
 * const puppeteer = require('puppeteer-extra')
 * puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({userPrefs: {
 *   webkit: {
 *     webprefs: {
 *       default_font_size: 22
 *     }
 *   }
 * }}))
 * const browser = await puppeteer.launch()
 */
export default class cookiesExtraPlugin extends PuppeteerExtraPlugin {
  constructor(opts = {}) {
    super(opts);
    this._userPrefsFromPlugins = {};

    const defaults = {
      userPrefs: {},
    };

    this._opts = Object.assign(defaults, opts);
  }

  get name() {
    return "cookies-manager";
  }

  async beforeLaunch() {
    console.log("LOG BEFORE LAUNCH CUSTOMIZED PLUGIN");
  }

  async onDisconnected() {
    console.log("LOG ONDISCONECTED CUSTOMIZED PLUGIN");
  }
}

// module.exports = function (pluginConfig) {
//   return new Plugin(pluginConfig);
// };
