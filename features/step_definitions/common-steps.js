'use strict';
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;


var myStepDefinitionsWrapper = function() {
    this.Given(/^I am on the "([^"]*)" page$/, function(arg1, callback) {
        browser.get(arg1);
        callback();
    });

    this.Then(/^the title should equal "([^"]*)"$/, function(arg1, callback) {
        expect(browser.getTitle()).to.eventually.equal(arg1).and.notify(callback);
    });

    this.Given(/^Test$/, function(callback) {
        callback.pending();
    });
};

module.exports = myStepDefinitionsWrapper;
