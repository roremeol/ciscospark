'use strict'
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const Spark = require('../src')
const expect = require('chai').expect

const TEST_ACCESSTOKEN = '**TestAccessToken**'
const TEST_USERAGENT = '**TestUsergent**'
const TEST_ROOM_ID = '12345678'
const TEST_TEAM_ID = '' + Date.now()

/** @test {Rooms} */
describe('CiscoSpark.rooms', function () {
  before(function () {
    this.spark = new Spark(TEST_ACCESSTOKEN, TEST_USERAGENT)
    this.spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    this.instance = this.spark.rooms
  })

  /** @test {Rooms#list} */
  it('should list Rooms', function (done) {
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

  /** @test {Rooms#create} */
  it('should create a new Room', function (done) {
    const title = 'Test Title'
    this.instance.create(title, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.method).to.be.equal('POST')
      expect(response.options.form.title).to.be.equal(title)
      done()
    })
  })

  /** @test {Rooms#get} */
  it('should get a Room Details', function (done) {
    this.instance.get(TEST_ROOM_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_ROOM_ID)
      expect(response.options.method).to.be.equal('GET')
      done()
    })
  })

  /** @test {Rooms#update} */
  it('should update a Room Details', function (done) {
    this.instance.update(TEST_ROOM_ID, { title: 'Ipsum Lorem' }, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_ROOM_ID)
      expect(response.options.json.title).to.be.ok
      expect(response.options.method).to.be.equal('PUT')
      done()
    })
  })

  /** @test {Rooms#delete} */
  it('should delete a Person', function (done) {
    this.instance.delete(TEST_ROOM_ID, (err, response) => {
      expect(err).to.be.not.ok
      expect(response.options.url).to.be.equal(this.instance.apiUrl + '/' + TEST_ROOM_ID)
      expect(response.options.method).to.be.equal('DELETE')
      done()
    })
  })

  describe('- Test Errors', function () {
    /** @test {Rooms#create} */
    it('should error when create without title', function (done) {
      this.instance.create(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })
  })
})
