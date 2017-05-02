'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Memberships
 * https://developer.ciscospark.com/resource-rooms.html
 */
class Memberships extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/memberships')
  }

  /**
   * List Memberships
   *
   * @param params see https://developer.ciscospark.com/endpoint-teammemberships-get.html
   * @param callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { teamId: params }
    }
    return super.list(params, callback)
  }

  /**
   * Create a Membership
   *
   */
  create (params, callback) {
    if (!params || !params.roomId) return callback(new Error('Invalid params. Require roomId'))
    if (!params.personId && !params.personEmail) return callback(new Error('Invalid params. Require personId or personEmail'))
    return super.create(params, callback)
  }
}

module.exports = Memberships
