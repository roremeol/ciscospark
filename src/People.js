'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark People
 * @see https://developer.ciscospark.com/resource-people.html
 */
class People extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/people')
    /** @private */
    this.idName = 'personId'
  }

  /**
   * List People
   * List people in your organization. For most users, either the email or a Display Name parameters are required.
   * Admin users can omit these fields and list all users in their organization.
   *
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-people-get.html
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { email: params }
    } else if (!params || !params.email || !params.displayName) {
      return callback(new Error('Invalid Params. Require email or displayName'))
    }
    return super.list(params, callback)
  }

  /**
   * Get my own details
   * @param {requestCallback} callback
   */
  me (callback) {
    return this.get('me', callback)
  }
}

module.exports = People
