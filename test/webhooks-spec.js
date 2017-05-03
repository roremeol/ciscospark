'use strict'
/* eslint-env mocha */

const Spark = require('../src')
const expect = require('chai').expect

const TEST_ACCESSTOKEN = '**TestAccessToken**'
const TEST_USERAGENT = '**TestUsergent**'
const TEST_WEBHOOK_ID = '**TestWebhookId**'

describe('CiscoSpark.webhooks', function () {
  before(function () {
    this.spark = new Spark(TEST_ACCESSTOKEN, TEST_USERAGENT)
    this.spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    this.instance = this.spark.webhooks;
  })

  it('should list Webhooks', function (done) {
    const max = 99
    this.instance.list({ max: max }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.headers.Authorization).to.be.equal('Bearer ' + TEST_ACCESSTOKEN)
      expect(response.options.headers['User-Agent']).to.be.equal(TEST_USERAGENT)
      expect(response.options.url).to.be.equal(this.instance.apiUrl)
      expect(response.options.method).to.be.equal('GET')
      expect(response.options.qs.max).to.be.equal(max)
      done()
    })
  })

  it('should create a Webhook', function (done) {
    const name = 'Test Webhook'
    this.instance.create({
      name: name,
      targetUrl: 'http://example.com/api',
      resource: 'unittest',
      event: 'tested'
    }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.method).to.be.equal('POST')
      expect(response.options.form.name).to.be.equal(name)
      expect(response.options.form.resource).to.be.ok
      done()
    })
  })

  it('should get Team Details', function (done) {
    this.instance.get(TEST_WEBHOOK_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_WEBHOOK_ID)
      expect(response.options.method).to.be.equal('GET')
      done()
    })
  })

  it('should update Team Details', function (done) {
    this.instance.update(TEST_WEBHOOK_ID, { name: 'new name' }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_WEBHOOK_ID)
      expect(response.options.json.name).to.be.ok
      expect(response.options.method).to.be.equal('PUT')
      done()
    })
  })

  it('should delete a Team Membership', function (done) {
    this.instance.delete(TEST_WEBHOOK_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_WEBHOOK_ID)
      expect(response.options.method).to.be.equal('DELETE')
      done()
    })
  })
})
