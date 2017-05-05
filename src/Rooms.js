'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Rooms
 * https://developer.ciscospark.com/resource-rooms.html
 */
class Rooms extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/rooms'
    this.idName = 'roomId'
  }

  /**
   * List Rooms
   *
   * @param params see https://developer.ciscospark.com/endpoint-rooms-get.html
   * @param callback
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
