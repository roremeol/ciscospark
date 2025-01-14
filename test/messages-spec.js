'use strict'
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const Spark = require('../src')
const expect = require('chai').expect

const TEST_ACCESSTOKEN = '**TestAccessToken**'
const TEST_USERAGENT = '**TestUsergent**'
const TEST_ROOM_ID = '**TestRoomId**'

/** @test {Messages} */
describe('CiscoSpark.messages', function () {
  before(function () {
    this.spark = new Spark(TEST_ACCESSTOKEN, TEST_USERAGENT)
    this.spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
  })

  describe('- Chat Room', function () {
    /** @test {Messages#createToRoom} */
    it('should send Message to a Room', function (done) {
      const text = 'This is a test message'
      this.spark.messages.createToRoom(TEST_ROOM_ID, text, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.url).to.be.equal(this.spark.messages.apiUrl)
        expect(response.options.headers.Authorization).to.be.equal('Bearer ' + TEST_ACCESSTOKEN)
        expect(response.options.headers['User-Agent']).to.be.equal(TEST_USERAGENT)
        expect(response.options.method).to.be.equal('POST')
        expect(response.options.form.roomId).to.be.equal(TEST_ROOM_ID)
        expect(response.options.form.markdown).to.be.equal(text)
        done()
      })
    })

    /** @test {Messages#list} */
    it('should list Messages in a Room', function (done) {
      this.spark.messages.list(TEST_ROOM_ID, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.url).to.be.equal(this.spark.messages.apiUrl)
        expect(response.options.method).to.be.equal('GET')
        expect(response.options.qs.roomId).to.be.equal(TEST_ROOM_ID)
        done()
      })
    })

    /** @test {Messages#get} */
    it('should get Message information from a Room', function (done) {
      this.spark.messages.get(TEST_ROOM_ID, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.url).to.be.equal(this.spark.messages.apiUrl + '/' + TEST_ROOM_ID)
        expect(response.options.method).to.be.equal('GET')
        done()
      })
    })

    /** @test {Messages#delete} */
    it('should delete a Message from a Room', function (done) {
      this.spark.messages.delete(TEST_ROOM_ID, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.url).to.be.equal(this.spark.messages.apiUrl + '/' + TEST_ROOM_ID)
        expect(response.options.method).to.be.equal('DELETE')
        done()
      })
    })
  })

  describe('- DirectToPerson', function () {
    /** @test {Messages#createToPersonId} */
    it('should send Message to a Person via ID', function (done) {
      const TEST_ID = '**TestPersonId**'
      const text = 'This is a test message'
      this.spark.messages.createToPersonId(TEST_ID, text, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.method).to.be.equal('POST')
        expect(response.options.form.toPersonId).to.be.equal(TEST_ID)
        expect(response.options.form.markdown).to.be.equal(text)
        done()
      })
    })

    /** @test {Messages#createToPersonEmail} */
    it('should send Message to a Person via Email', function (done) {
      const TEST_ID = 'test@example.com'
      const text = 'This is a test message'
      this.spark.messages.createToPersonEmail(TEST_ID, text, (err, response) => {
        expect(err).to.be.not.ok
        expect(response.options.method).to.be.equal('POST')
        expect(response.options.form.toPersonEmail).to.be.equal(TEST_ID)
        expect(response.options.form.markdown).to.be.equal(text)
        done()
      })
    })
  })

  describe('- Test Errors', function () {
    /** @test {Messages#list} */
    it('should error when list without RoomId', function (done) {
      this.spark.messages.list(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })

    /** @test {Messages#create} */
    it('should error when create without RoomId', function (done) {
      const text = 'This is a test message'
      this.spark.messages.create({ markdown: text }, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })

    /** @test {Messages#get} */
    it('should error when get without MessageId', function (done) {
      this.spark.messages.get(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })

    /** @test {Messages#delete} */
    it('should error when delete without MessageId', function (done) {
      this.spark.messages.delete(null, (err, response) => {
        expect(err).to.be.instanceOf(Error)
        expect(response).to.be.not.ok
        done()
      })
    })
  })
})
