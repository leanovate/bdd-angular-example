(function(angular) {
    'use strict';

    angular.module('<%= _.camelize(name) %>', ['appCore']);
    angular.module('<%= _.camelize(name) %>').run(<%= _.camelize(name) + 'Run' %>);

    /* @ngInject */
    function <%= _.camelize(name) + 'Run' %>(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [

            /* Add New States Above */
        ];
    }

})(angular);
