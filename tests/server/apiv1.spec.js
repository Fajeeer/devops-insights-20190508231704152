
/*eslint-disable no-extra-parens */
(function () {

  'use strict';

	var requireHelper = require('./requireHelper');
  var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1');
  var assert = require('chai').assert;
  var sinon = require('sinon');



  // create mock request and response
  var reqMock = {};

  var resMock = {};
  resMock.status = function() {
    return this;
  };
  resMock.send = function() {
    return this;
  };
  resMock.end = function() {
    return this;
  };
  sinon.spy(resMock, "status");
  sinon.spy(resMock, "send");


  describe('Get Weather', function() {
	//'with without zip code'
    it('with without city name', function() {
      reqMock = {
        query: {

        }
      };

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid zip code and error from request call', function() {
      reqMock = {
        query: {
         // zip: 79968
         //q: 'New Zealand'
         cityName: 'New Zealand'
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with incomplete zip code', function() {
      reqMock = {
        query: {
          //zip: 79968
          //q: 'New Zealand'
          cityName: 'New Zealand'
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with valid zip code', function() {
      reqMock = {
        query: {
          //zip: 79968
         // q: 'New Zealand'
         cityName: 'New Zealand'
        }
      };

      var body = {
        cod: 200,
       // codeName: 'Auckland',
        //name: 'El Paso',
        name: 'Auckland',
        weather: [
          {
            main: 'cloudy'//'cold'
          }
        ],
        main: {
          temp: 20
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].city === 'Auckland'/*'El Paso'*/, 'Unexpected response:' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cloudy and temperature is 20 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
    });
  });
  
  describe('Get Weather 2', function() {

    it('with without zip code', function() {
      reqMock = {
        query: {

        }
      };

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid zip code and error from request call', function() {
      reqMock = {
        query: {
          //zip: 79968
         // q: 'New Zealand'
         cityName: 'New Zealand'
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with incomplete zip code', function() {
      reqMock = {
        query: {
          //zip: 79968
          //q: 'New Zealand'
          cityName: 'New Zealand'
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with valid zip code', function() {
      reqMock = {
        query: {
         // zip: 79968
         //q: 'New Zealand'
         cityName: 'New Zealand'
        }
      };

      var body = {
        cod: 200,
        //codeName: 'Auckland',
        //name: 'El Paso',
        name: 'Auckland',
        weather: [
          {
            main: 'cloudy'//'cold'
          }
        ],
        main: {
          temp: 20 //78
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].city === 'Auckland', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cloudy and temperature is 20 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
    });
  });
}());
