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

  list (params, callback) {
    if (typeof params === 'string') {
      params = { teamId: params }
    }
    return super.list(params, callback)
  }

  create (params, callback) {
    if (!params || !params.teamId) return callback(new Error('Invalid params. Require teamId'))
    if (!params.personId && !params.personEmail) return callback(new Error('Invalid params. Require personId or personEmail'))
    return super.create(params, callback)
  }
}

module.exports = TeamMemberships
