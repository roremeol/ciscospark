'use strict'

const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Messages
 * https://developer.ciscospark.com/resource-messages.html
 */
class Messages extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent)
    this.apiUrl = 'https://api.ciscospark.com/v1/messages'
  }

  /**
   * List Messages
   * Lists all messages in a room. Each message will include content attachments if present.
   * The list sorts the messages in descending order by creation date.
   *
   * @param params see https://developer.ciscospark.com/endpoint-messages-get.html
   * @param callback
   */
  list (params, callback) {
    if (!params || !params.roomId) {
      if (typeof params === 'string') {
        params = { roomId: params }
      } else {
        return callback(new Error('Invalid Params. Require roomId'))
      }
    }
    return super.list(params, callback)
  }

  /**
   * Create a Message
   * Posts a plain text message, and optionally, a media content attachment, to a room.
   *
   * @param params see https://developer.ciscospark.com/endpoint-messages-post.html
   * @param callback
   */
  create (params, callback) {
    if (params && (params.roomId || params.toPersonId || params.toPersonEmail)) {
      return super.create(params, callback)
    } else {
      return callback(new Error('Invalid Params. Require roomId, toPersonId or toPersonEmail'))
    }
  }

  createToRoom (roomId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.roomId = roomId
    return this.create(params, callback)
  }

  createToPersonId (personId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonId = personId
    return this.create(params, callback)
  }

  createToPersonEmail (email, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonEmail = email
    return this.create(params, callback)
  }

  get (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.get(messageId, callback)
  }

  delete (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.delete(messageId, callback)
  }
}

module.exports = Messages
