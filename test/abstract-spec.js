'use strict'
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const Spark = require('../src')
const SparkBase = require('../src/CiscoSpark')
const chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const async = require('async')

/** @test {CiscoSpark} */
describe('CiscoSpark.abstractMethods', function () {
  /** @test {CiscoSpark#request} */
  it('should get token from Environment Variable', function (done) {
    process.env.CISCOSPARK_ACCESS_TOKEN = '***Test Token***'
    process.env.CISCOSPARK_USER_AGENT = '***Test Agent***'
    const sparkx = new SparkBase()
    sparkx.accessToken = null
    sparkx.userAgent = null
    const spark = new SparkBase(sparkx)
    spark.apiUrl = 'http://localhost/dev/null'
    expect(spark.accessToken).to.be.equals(process.env.CISCOSPARK_ACCESS_TOKEN)
    expect(spark.userAgent).to.be.equals(process.env.CISCOSPARK_USER_AGENT)
    spark.request({method: 'GET'}, () => { done() })
  })

  it('should error if ApiUrl is not set', function (done) {
    const spark = new Spark()
    const tasks = [
      (cb) => {
        spark.list(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          expect(response).to.be.not.ok
          cb()
        })
      },
      (cb) => {
        spark.create(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          expect(response).to.be.not.ok
          cb()
        })
      },
      (cb) => {
        spark.get(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          expect(response).to.be.not.ok
          cb()
        })
      },
      (cb) => {
        spark.update(0, null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          expect(response).to.be.not.ok
          cb()
        })
      },
      (cb) => {
        spark.delete(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          expect(response).to.be.not.ok
          cb()
        })
      }
    ]
    async.parallel(tasks, done)
  })

  it('should error if Params is not set', function (done) {
    const spark = new SparkBase('***Test Token***', '***Test Agent***', '***Test URL***')
    spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    const tasks = [
      (cb) => {
        spark.list(null, (err, response) => {
          expect(err).to.be.not.ok
          cb()
        })
      },
      (cb) => {
        spark.create(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          cb()
        })
      },
      (cb) => {
        spark.get(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          cb()
        })
      },
      (cb) => {
        spark.update(0, null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          cb()
        })
      },
      (cb) => {
        spark.delete(null, (err, response) => {
          expect(err).to.be.instanceOf(Error)
          cb()
        })
      }
    ]
    async.parallel(tasks, done)
  })

  it('should detect arguments correctly', function (done) {
    const spark = new SparkBase('***Test Token***', '***Test Agent***', '***Test URL***')
    spark.requestCallback = function (options, callback) {
      return callback(null, {
        options: options,
        timestamp: Date.now()
      })
    }
    spark.idName = 'testId'
    const testId = '*** Test Id ***'
    const testValue = '' + Date.now()
    const tasks = [
      (cb) => {
        spark.get({ id: testId }, (err, response) => {
          expect(err).to.be.not.ok
          expect(response.options.url).to.endsWith(testId)
          cb()
        })
      },
      (cb) => {
        spark.update({ 'testId': testId, 'key': testValue }, (err, response) => {
          expect(err).to.be.not.ok
          expect(response.options.url).to.endsWith(testId)
          expect(response.options.json.key).to.be.equals(testValue)
          cb()
        })
      },
      (cb) => {
        spark.update((err, response) => {
          expect(err).to.be.not.ok
          expect(response.options.url).to.endsWith(testId)
          expect(response.options.json.key).to.be.equals(testValue)
          cb()
        }, { key: testValue }, testId)
      }
    ]
    async.parallel(tasks, done)
  })
})
