'use strict'
/* eslint-env mocha */

const Spark = require('../src')
const SparkBase = require('../src/CiscoSpark')
const expect = require('chai').expect
const async = require('async')

describe('CiscoSpark.abstractMethods', function () {
  it('should get token from Environment Variable', function (done) {
    process.env.CISCOSPARK_ACCESS_TOKEN = '***Test Token***'
    process.env.CISCOSPARK_USER_AGENT = '***Test Agent***'
    const sparkx = new SparkBase()
    sparkx.accessToken = null;
    sparkx.userAgent = null;
    const spark = new SparkBase(sparkx)
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
})
