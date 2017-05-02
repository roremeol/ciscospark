'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * https://developer.ciscospark.com/resource-teams.html
 */
class Teams extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/teams'
  }
}

module.exports = Teams
