(function() {
    'use strict';

    angular
        .module('appCore')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var states = [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'appCore/404.html',
                    title: '404'
                }
            }
        ];

        routerHelper.configureStates(states, '/404');
    }

})(angular);
