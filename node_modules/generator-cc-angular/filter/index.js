'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var ccUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {

    ccUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(FilterGenerator, yeoman.generators.Base);

FilterGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    ccUtils.addNamePrompt(this, prompts, 'filter');

    this.prompt(prompts, function(props) {
        if(props.name) {
            this.name = props.name;
        }
        ccUtils.askForModuleAndDir('filter', this, false, cb);
    }.bind(this));


};

FilterGenerator.prototype.files = function files() {

    ccUtils.processTemplates(this.name, ccUtils.getDirWithSrc(this.dir), 'filter', this, null, null, this.module);

};
