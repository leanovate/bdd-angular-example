(function(module, localStorage) {
    'use strict';
    var myHooks = function() {
        this.After(function (scenario, callback) {
            browser.executeScript('localStorage.clear();');
            callback();
        });
    };

    module.exports = myHooks;

})(module);
