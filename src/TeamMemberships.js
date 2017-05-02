'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * https://developer.ciscospark.com/resource-team-memberships.html
 */
class TeamMemberships extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/team/memberships'
  }
}

module.exports = TeamMemberships
