(function(angular) {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: '<%= htmlPath %>',
            link: link<%= _.camelize(name) %>
        };
    });

    function link<%= _.camelize(name) %>(scope, elem, attrs, fn) {

    }
})(angular);
