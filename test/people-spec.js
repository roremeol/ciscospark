'use strict'
/* eslint-env mocha */

const Spark = require('../src')
const expect = require('chai').expect

const TEST_ACCESSTOKEN = '**TestAccessToken**'
const TEST_USERAGENT = '**TestUsergent**'
const TEST_PERSON_ID = 12345678
const TEST_EMAIL = 'test@example.com'

describe('CiscoSpark.people', function () {
  before(function () {
    this.spark = new Spark(TEST_ACCESSTOKEN, TEST_USERAGENT)
    this.spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    this.instance = this.spark.people
  })

  it('should list People in the organisation', function (done) {
    this.instance.list(TEST_EMAIL, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.headers.Authorization).to.be.equal('Bearer ' + TEST_ACCESSTOKEN)
      expect(response.options.headers['User-Agent']).to.be.equal(TEST_USERAGENT)
      expect(response.options.url).to.be.equal(this.instance.apiUrl)
      expect(response.options.method).to.be.equal('GET')
      expect(response.options.qs.email).to.be.equal(TEST_EMAIL)
      done()
    })
  })

  it('should create a new Person', function (done) {
    const displayName = 'John Doe'
    this.instance.create({
      displayName: displayName,
      emails: [ TEST_EMAIL ]
    }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.method).to.be.equal('POST')
      expect(response.options.form.emails).to.contains(TEST_EMAIL)
      expect(response.options.form.displayName).to.be.equal(displayName)
      done()
    })
  })

  it('should get a Person Details', function (done) {
    this.instance.get(TEST_PERSON_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_PERSON_ID)
      expect(response.options.method).to.be.equal('GET')
      done()
    })
  })

  it('should get my own Details', function (done) {
    this.instance.me((err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/me')
      expect(response.options.method).to.be.equal('GET')
      done()
    })
  })

  it('should update a Person Details', function (done) {
    this.instance.update(TEST_PERSON_ID, { displayName: 'John Doe' }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_PERSON_ID)
      expect(response.options.json.displayName).to.be.ok
      expect(response.options.method).to.be.equal('PUT')
      done()
    })
  })

  it('should delete a Person', function (done) {
    this.instance.delete(TEST_PERSON_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_PERSON_ID)
      expect(response.options.method).to.be.equal('DELETE')
      done()
    })
  })

  describe('- Test Errors', function () {
    it('should error when list without details', function (done) {
      this.instance.list(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })
  })
})
