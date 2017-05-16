'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * @see https://developer.ciscospark.com/resource-webhooks.html
 */
class Webhooks extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/webhooks')
    /** @private */
    this.idName = 'webhookId'
  }
}

module.exports = Webhooks
