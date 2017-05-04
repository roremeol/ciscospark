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
  }

  request (options, callback) {
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
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!params) params = {}
    return this.request({
      method: 'GET',
      qs: params
    }, callback)
  }

  /**
   * Create an object
   *
   */
  create (params, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!params) return callback(new Error('Invalid Params.'))
    return this.request({
      method: 'POST',
      form: params
    }, callback)
  }

  /**
   * Get an object
   *
   */
  get (id, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!this.checkId(id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'GET',
      url: `${this.apiUrl}/${id}`
    }, callback)
  }

  /**
   * Update an object
   *
   */
  update (id, params, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!this.checkId(id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'PUT',
      url: `${this.apiUrl}/${id}`,
      json: params
    }, callback)
  }

  /**
   * Delete an Object
   *
   */
  delete (id, callback) {
    if (!this.apiUrl) return callback(new Error('ApiUrl is not set'))
    if (!this.checkId(id)) return callback(new Error('ID is missing or in the wrong format'))
    return this.request({
      method: 'DELETE',
      url: `${this.apiUrl}/${id}`
    }, callback)
  }

  set requestCallback (callback) {
    this._requestCallback = callback
  }
}

module.exports = CiscoSpark
