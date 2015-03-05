require('hide-stack-frames-from')('cucumber');
exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    // change this to your url, if you don't use grunt-connect
    baseUrl: 'http://localhost:9002/src',

    framework: 'cucumber',
    cucumberOpts: {
        require: ['features/**/*.js', '**/*.steps.js'],
        format: 'pretty'
    }

};
