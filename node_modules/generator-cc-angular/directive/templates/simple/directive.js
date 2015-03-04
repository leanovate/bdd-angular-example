(function(angular) {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function() {
        return {
            restrict: 'A',
            link: link<%= _.camelize(name) %>
        };
    });

    function link<%= _.camelize(name) %>(scope, elem, attrs, fn) {

    }
})(angular);
