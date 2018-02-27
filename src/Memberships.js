'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Memberships
 * @see https://developer.ciscospark.com/resource-memberships.html
 */
class Memberships extends CiscoSpark {
  /**
   * @constructor
   * @param {?string} accessToken - Your Cisco Spark accesstoken
   * @param {?string} userAgent - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/memberships')
    /** @private */
    this.idName = 'membershipId'
  }

  /**
   * List Memberships
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-teammemberships-get.html
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { roomId: params }
    }
    return super.list(params, callback)
  }

  /**
   * Create a Membership
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-teammemberships-post.html
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (!params || !params.roomId) return callback(new Error('Invalid params. Require roomId'))
    if (!params.personId && !params.personEmail) return callback(new Error('Invalid params. Require personId or personEmail'))
    return super.create(params, callback)
  }
}

module.exports = Memberships
