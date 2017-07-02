'use strict'

/** @ignore */
const request = require('request')

/**
 * Cisco Spark API Abstract Class
 * @abstract
 */
class CiscoSpark {
  /**
   * Constructor for abstract class
   * @constructor
   * @param {?string} accessToken - Your Cisco Spark accesstoken
   * @param {?string} userAgent - User Agent request header
   * @param {?string} apiUrl - API Url
   */
  constructor (accessToken, userAgent, apiUrl) {
    if (accessToken instanceof CiscoSpark) {
      /**
       * @type {string}
       * @protected
       */
      this.accessToken = accessToken.accessToken || process.env.CISCOSPARK_ACCESS_TOKEN
      /**
       * @type {string}
       * @protected
       */
      this.userAgent = userAgent || accessToken.userAgent || process.env.CISCOSPARK_USER_AGENT
      /**
       * @type {string}
       * @protected
       */
      this.apiUrl = apiUrl || accessToken.apiUrl
      /**
       * @type {?requestCallback}
       * @private
       */
      this._requestCallback = accessToken._requestCallback
    } else {
      this.accessToken = accessToken || process.env.CISCOSPARK_ACCESS_TOKEN
      this.userAgent = userAgent || process.env.CISCOSPARK_USER_AGENT
      this.apiUrl = apiUrl
      this._requestCallback = null
    }
    /**
     * @type {string}
     * @protected
     */
    this.idName = 'id'
  }

  /**
   * @external {HttpResponse} https://nodejs.org/api/http.html#http_class_http_serverresponse
   */

  /**
   * Request Callback
   * @typedef {function} requestCallback
   * @param {Error} error - Error object
   * @param {Object} body - Response body
   * @param {HttpResponse} response - Http Server Response
   * @param {} next - Next iteration if available
   */

  /**
   * Make a request
   * @param {Object} options - Options for Request
   * @param {requestCallback} callback - Callback
   * @protected
   */
  request (options, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!options.url && this.apiUrl) options.url = this.apiUrl
    if (!options.headers) options.headers = {}
    options.headers.Authorization = 'Bearer ' + this.accessToken
    if (this.userAgent) options.headers['User-Agent'] = this.userAgent
    options.headers['Accept'] = 'application/json'
    if (typeof this._requestCallback === 'function') return this._requestCallback(options, callback)
    return request(options, (error, response, body) => {
      const next = this.getNext(options, response ? response.headers || {} : {})
      callback(error, body, response, next)
    })
  }

  /**
   * Pagination: Next Iteration Callback
   * @typedef {function} nextIterationCallback
   * @param {requestCallback} callback - Callback
   */

  /**
   * Get Next Pagination based on Response header, if available
   * @param {Object} options
   * @param {Object} headers - HTTP Response headers
   * @return {nextIterationCallback}
   * @protected
   */
  getNext (options, headers) {
    if (!headers['Link']) return null
    const re = /<(https:\/\/.+)>; rel="next"/i
    let links = headers['Link']
    if (Array.isArray(links)) links = links.join('|')
    const result = re.exec(links)
    if (!result || !result[1]) return null
    options.url = result[1]
    return (callback) => {
      return request(options, (error, response, body) => {
        const next = this.getNext(options, response ? response.headers || {} : {})
        callback(error, body, response, next)
      })
    }
  }

  /**
   * Check Id
   * @abstract
   * @param {string} id - Id string to be checked
   * @return {boolean} - Is Id valid?
   */
  checkId (id) {
    return (id && (typeof id === 'string' || typeof id === 'number'))
  }

  /**
   * List objects
   * @param {Object} params - Parameters of request
   * @param {requestCallback} callback
   */
  list (params, callback) {
    const args = this.getArgs(params, callback)
    this.request({
      method: 'GET',
      qs: args.params
    }, args.callback)
  }

  /**
   * Create an object
   * @param {Object} params - Parameters of request
   * @param {requestCallback} callback
   */
  create (params, callback) {
    const args = this.getArgs(params, callback)
    if (!args.params) return callback(new Error('Invalid Params.'))
    this.request({
      method: 'POST',
      form: args.params
    }, args.callback)
  }

  /**
   * Get an object
   * @param {string} id - Id of the object
   * @param {requestCallback} callback
   */
  get (id, callback) {
    const args = this.getArgs(id, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    this.request({
      method: 'GET',
      url: `${this.apiUrl}/${args.id}`
    }, args.callback)
  }

  /**
   * Update an object
   * @param {string} id - Id of the object
   * @param {Object} params - Parameters of request
   * @param {requestCallback} callback
   */
  update (id, params, callback) {
    const args = this.getArgs(id, params, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    this.request({
      method: 'PUT',
      url: `${this.apiUrl}/${args.id}`,
      json: args.params
    }, args.callback)
  }

  /**
   * Delete an Object
   * @param {string} id - Id of the object
   * @param {requestCallback} callback
   */
  delete (id, callback) {
    const args = this.getArgs(id, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    this.request({
      method: 'DELETE',
      url: `${this.apiUrl}/${args.id}`
    }, args.callback)
  }

  /**
   * @private
   */
  getArgs () {
    const result = {
      id: null,
      params: null,
      callback: null
    }
    for (let i = 0; i < arguments.length; ++i) {
      if (typeof arguments[i] === 'function') {
        result.callback = arguments[i]
      } else if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
        result.id = arguments[i]
      } else if (arguments[i] !== null && typeof arguments[i] === 'object') {
        result.params = arguments[i]
      }
    }
    if (result.id === null && result.params) {
      if (result.params[this.idName]) {
        result.id = result.params[this.idName]
      } else if (result.params.id) {
        result.id = result.params.id
      }
    }
    return result
  }

  /**
   * @type {requestCallback}
   */
  set requestCallback (callback) {
    this._requestCallback = callback
  }
}

module.exports = CiscoSpark
