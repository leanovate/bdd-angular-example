(function(angular) {
    'use strict';

    angular.module('<%= appname %>').filter('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    function <%= _.camelize(name) %>() {
        return function(input, arg) {
            return 'output';
        };
    }
})(angular);
