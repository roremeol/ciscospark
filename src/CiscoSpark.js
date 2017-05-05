'use strict'

const request = require('request')

class CiscoSpark {
  constructor (accessToken, userAgent, apiUrl) {
    if (accessToken instanceof CiscoSpark) {
      this.accessToken = accessToken.accessToken || process.env.CISCOSPARK_ACCESS_TOKEN
      this.userAgent = userAgent || accessToken.userAgent || process.env.CISCOSPARK_USER_AGENT
      this.apiUrl = apiUrl || accessToken.apiUrl
      this._requestCallback = accessToken._requestCallback
    } else {
      this.accessToken = accessToken || process.env.CISCOSPARK_ACCESS_TOKEN
      this.userAgent = userAgent || process.env.CISCOSPARK_USER_AGENT
      this.apiUrl = apiUrl
      this._requestCallback = null
    }
    this.idName = 'id'
  }

  request (options, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!options.url && this.apiUrl) options.url = this.apiUrl
    if (!options.headers) options.headers = {}
    options.headers.Authorization = 'Bearer ' + this.accessToken
    if (this.userAgent) options.headers['User-Agent'] = this.userAgent
    options.headers['Accept'] = 'application/json'
    if (typeof this._requestCallback === 'function') return this._requestCallback(options, callback)
    return request(options, (error, response, body) => {
      callback(error, body, response)
    })
  }

  checkId (id) {
    return (id && (typeof id === 'string' || typeof id === 'number'))
  }

  /**
   * List objects
   *
   */
  list (params, callback) {
    const args = this.getArgs(params, callback)
    return this.request({
      method: 'GET',
      qs: args.params
    }, args.callback)
  }

  /**
   * Create an object
   *
   */
  create (params, callback) {
    const args = this.getArgs(params, callback)
    if (!args.params) return callback(new Error('Invalid Params.'))
    return this.request({
      method: 'POST',
      form: args.params
    }, args.callback)
  }

  /**
   * Get an object
   *
   */
  get (id, callback) {
    const args = this.getArgs(id, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'GET',
      url: `${this.apiUrl}/${args.id}`
    }, args.callback)
  }

  /**
   * Update an object
   *
   */
  update (id, params, callback) {
    const args = this.getArgs(id, params, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'PUT',
      url: `${this.apiUrl}/${args.id}`,
      json: args.params
    }, args.callback)
  }

  /**
   * Delete an Object
   *
   */
  delete (id, callback) {
    const args = this.getArgs(id, callback)
    if (!this.checkId(args.id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'DELETE',
      url: `${this.apiUrl}/${args.id}`
    }, args.callback)
  }

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

  set requestCallback (callback) {
    this._requestCallback = callback
  }
}

module.exports = CiscoSpark
