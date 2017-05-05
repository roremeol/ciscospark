'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark People
 * https://developer.ciscospark.com/resource-people.html
 */
class People extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/people'
    this.idName = 'personId'
  }

  /**
   * List People
   * List people in your organization. For most users, either the email or a Display Name parameters are required.
   * Admin users can omit these fields and list all users in their organization.
   *
   * @param params see https://developer.ciscospark.com/endpoint-people-get.html
   * @param callback
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
   *
   */
  me (callback) {
    return this.get('me', callback)
  }
}

module.exports = People
