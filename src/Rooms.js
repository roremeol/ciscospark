'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Rooms
 * @see https://developer.ciscospark.com/resource-rooms.html
 */
class Rooms extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/rooms')
    /** @private */
    this.idName = 'roomId'
  }

  /**
   * List Rooms
   *
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-rooms-get.html
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { teamId: params }
    }
    return super.list(params, callback)
  }

  /**
   * Create a Room
   *
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-rooms-post.html
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (typeof params === 'string') {
      params = { title: params }
    }
    if (!params || !params.title) return callback(new Error('Invalid Params. Require title'))
    return super.create(params, callback)
  }
}

module.exports = Rooms
