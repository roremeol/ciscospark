'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * https://developer.ciscospark.com/resource-webhooks.html
 */
class Webhooks extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/webhooks'
    this.idName = 'webhookId'
  }
}

module.exports = Webhooks
