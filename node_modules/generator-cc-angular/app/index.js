'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ccUtils = require('../utils.js');

var CcangularGenerator = module.exports = function CcangularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.config.set('partialDirectory', 'partial/');
        this.config.set('modalDirectory', 'partial/');
        this.config.set('directiveDirectory', 'directive/');
        this.config.set('filterDirectory', 'filter/');
        this.config.set('serviceDirectory', 'service/');
        var inject = {
            js: {
                file: 'index.html',
                marker: ccUtils.JS_MARKER,
                template: '<script src="<%= filename %>"></script>'
            },
            less: {
                relativeToModule: true,
                file: '<%= module %>.less',
                marker: ccUtils.LESS_MARKER,
                template: '@import "<%= filename %>";'
            }
        };
        this.config.set('inject', inject);
        //angular bootstrap not 1.3 ready
        //<% if(withAngularBootstrap) { print ('"angular-bootstrap": "*",'); } %>
        this.config.set('withAngularBootstrap', false);

        this.config.save();
        this.installDependencies({skipInstall: options['skip-install']});
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CcangularGenerator, yeoman.generators.Base);

CcangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'appname',
            message: 'What would you like the angular app/module name to be?',
            default: path.basename(process.cwd())
        }
    ];

    this.prompt(prompts, function(props) {
        this.appname = props.appname;
        cb();
    }.bind(this));
};

/*CcangularGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'router',
            type: 'list',
            message: 'Which router would you like to use?',
            default: 0,
            choices: ['Standard Angular Router', 'Angular UI Router']
        }
    ];

    this.prompt(prompts, function(props) {
        if(props.router === 'Angular UI Router') {
            this.uirouter = true;
            this.routerJs = '_bc/angular-ui-router/release/angular-ui-router.js';
            this.routerModuleName = 'ui.router';
            this.routerViewDirective = 'ui-view';
        } else {
            this.uirouter = false;
            this.routerJs = '_bc/angular-route/angular-route.js';
            this.routerModuleName = 'ngRoute';
            this.routerViewDirective = 'ng-view';
        }
        this.config.set('uirouter', this.uirouter);
        cb();
    }.bind(this));
};*/

CcangularGenerator.prototype.app = function app() {
    this.directory('skeleton/', './');
};
