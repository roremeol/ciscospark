'use strict'
/* eslint-env mocha */

const Spark = require('../src')
const expect = require('chai').expect

const TEST_ACCESSTOKEN = '**TestAccessToken**'
const TEST_USERAGENT = '**TestUsergent**'
const TEST_TEAM_ID = '**TestTeamId**'
const TEST_MEMBERSHIP_ID = '**TestMemberId**'

describe('CiscoSpark.memberships', function () {
  before(function () {
    this.spark = new Spark(TEST_ACCESSTOKEN, TEST_USERAGENT)
    this.spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    this.instance = this.spark.memberships;
  })

  it('should list Memberships in a Team', function (done) {
    this.instance.list(TEST_TEAM_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.headers.Authorization).to.be.equal('Bearer ' + TEST_ACCESSTOKEN)
      expect(response.options.headers['User-Agent']).to.be.equal(TEST_USERAGENT)
      expect(response.options.url).to.be.equal(this.instance.apiUrl)
      expect(response.options.method).to.be.equal('GET')
      expect(response.options.qs.teamId).to.be.equal(TEST_TEAM_ID)
      done()
    })
  })

  it('should create a Team Membership', function (done) {
    const email = 'test@example.com'
    this.instance.create({
      teamId: TEST_TEAM_ID,
      personEmail: email
    }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.method).to.be.equal('POST')
      expect(response.options.form.teamId).to.be.equal(TEST_TEAM_ID)
      expect(response.options.form.personEmail).to.be.equal(email)
      done()
    })
  })

  it('should get Team Membership Details', function (done) {
    this.instance.get(TEST_MEMBERSHIP_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_MEMBERSHIP_ID)
      expect(response.options.method).to.be.equal('GET')
      done()
    })
  })

  it('should update Team Membership Details', function (done) {
    this.instance.update(TEST_MEMBERSHIP_ID, { isModerator: true }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_MEMBERSHIP_ID)
      expect(response.options.json.isModerator).to.be.ok
      expect(response.options.method).to.be.equal('PUT')
      done()
    })
  })

  it('should delete a Team Membership', function (done) {
    this.instance.delete(TEST_MEMBERSHIP_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_MEMBERSHIP_ID)
      expect(response.options.method).to.be.equal('DELETE')
      done()
    })
  })

  describe('- Test Errors', function () {
    it('should error when create without TeamId', function (done) {
      this.instance.create(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })

    it('should error when create without PersonId or EMail', function (done) {
      this.instance.create({ teamId: TEST_TEAM_ID }, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })
  })
})
