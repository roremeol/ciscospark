'use strict'

const CiscoSpark = require('./CiscoSpark')

class CiscoSparkFactory extends CiscoSpark {
  constructor (accessToken, userAgent) {
    super(accessToken)
    this.userAgent = userAgent || 'node-ciscospark (https://github.com/joelee/ciscospark)'
    this._instances = {}
  }

  get messages () {
    return this._getInstance('Messages')
  }

  get people () {
    return this._getInstance('People')
  }

  get teams () {
    return this._getInstance('Teams')
  }

  get rooms () {
    return this._getInstance('Rooms')
  }

  get memberships () {
    return this._getInstance('Memberships')
  }

  get teamMemberships () {
    return this._getInstance('TeamMemberships')
  }

  get webhooks () {
    return this._getInstance('Webhooks')
  }

  _getInstance (name) {
    if (!this._instances[name]) {
      const InstanceClass = require('./' + name)
      this._instances[name] = new InstanceClass(this)
    }
    return this._instances[name]
  }
}

module.exports = CiscoSparkFactory
