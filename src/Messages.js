'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Messages
 * @see https://developer.ciscospark.com/resource-messages.html
 */
class Messages extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/messages')
    /** @private */
    this.idName = 'messageId'
  }

  /**
   * List Messages
   * Lists all messages in a room. Each message will include content attachments if present.
   * The list sorts the messages in descending order by creation date.
   *
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-messages-get.html
   * @param {requestCallback} callback
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
   * @override
   * @param {Object} params - see https://developer.ciscospark.com/endpoint-messages-post.html
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (params && (params.roomId || params.toPersonId || params.toPersonEmail)) {
      return super.create(params, callback)
    } else {
      return callback(new Error('Invalid Params. Require roomId, toPersonId or toPersonEmail'))
    }
  }

  /**
   * Create a Message to a Room
   *
   * @param {string} roomId - Spark Room ID
   * @param {string|Object} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToRoom (roomId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.roomId = roomId
    return this.create(params, callback)
  }

  /**
   * Create a Message for a Person
   *
   * @param {string} personId - Spark Person ID
   * @param {string|Object} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToPersonId (personId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonId = personId
    return this.create(params, callback)
  }

  /**
   * Create a Message to a person via email
   *
   * @param {string} email - Email address
   * @param {string|Object} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToPersonEmail (email, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonEmail = email
    return this.create(params, callback)
  }

  /**
   * Get a message
   *
   * @override
   * @param {string} messageId - Spark Message ID
   * @param {requestCallback} callback
   */
  get (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.get(messageId, callback)
  }

  /**
   * Delete a message
   *
   * @override
   * @param {string} messageId - Spark Message ID
   * @param {requestCallback} callback
   */
  delete (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.delete(messageId, callback)
  }
}

module.exports = Messages
