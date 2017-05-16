'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Cisco Spark Factory class
 * @extends {CiscoSpark}
 * @example
 *   const CiscoSpark = require('node-ciscospark')
 *   const spark = new CiscoSpark('Access Token');
 *   spark.messages({ roomId: 'your-room-id', text: 'Message'})
 */
class CiscoSparkFactory extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken)
    /**
     * @type {string}
     * @protected
     */
    this.userAgent = userAgent || 'node-ciscospark (https://github.com/joelee/ciscospark)'
    /** @private */
    this._instances = {}
  }

  /**
   * Spark Messages
   * @return {Messages} - Message Object
   */
  get messages () {
    return this._getInstance('Messages')
  }

  /**
   * Spark People
   * @return {People}
   */
  get people () {
    return this._getInstance('People')
  }

  /**
   * Spark Teams
   * @return {Teams}
   */
  get teams () {
    return this._getInstance('Teams')
  }

  /**
   * Spark Rooms
   * @return {Rooms}
   */
  get rooms () {
    return this._getInstance('Rooms')
  }

  /**
   * Spark Memberships
   * @return {Memberships}
   */
  get memberships () {
    return this._getInstance('Memberships')
  }

  /**
   * Spark Team Memberships
   * @return {TeamMemberships}
   */
  get teamMemberships () {
    return this._getInstance('TeamMemberships')
  }

  /**
   * Spark Webhooks
   * @return {Webhooks}
   */
  get webhooks () {
    return this._getInstance('Webhooks')
  }

  /** @private */
  _getInstance (name) {
    if (!this._instances[name]) {
      const InstanceClass = require('./' + name)
      this._instances[name] = new InstanceClass(this)
    }
    return this._instances[name]
  }
}

module.exports = CiscoSparkFactory
