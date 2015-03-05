var todoStepWrapper = function() {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    this.Then(/^the to do list should contain (\d+) elemen(t|ts)$/, function(arg1, arg2, callback) {
        expect(element(by.css('#todo-list')).isPresent()).to.eventually.equal(true);
        var todoList = element.all(by.css('#todo-list li'));
        expect(todoList.count())
            .to.eventually.equal(parseInt(arg1, 10))
            .and.notify(callback);

    });

    this.When(/^I add a to do called "([^"]*)"$/, function(arg1, callback) {
        element(by.css('#new-todo'))
            .sendKeys('args1', protractor.Key.ENTER);
        callback();
    });

    this.When(/^I hit enter on the empty to do input field$/, function(callback) {
        element(by.css('#new-todo'))
            .sendKeys(protractor.Key.ENTER);

        callback();
    });
};
module.exports = todoStepWrapper;
