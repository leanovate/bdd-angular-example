(function(angular) {
    'use strict';

    angular.module('todos', ['appCore']);
    angular.module('todos').run(todosRun);

    /* @ngInject */
    function todosRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [

               {
               state: 'todos',
               config: {
                       url: '/todos',
                       templateUrl: 'todos/todos.html',
                       controller: 'TodosCtrl',
                       controllerAs: 'td',
                       title: 'My to dos'
              }
        },
            /* Add New States Above */
        ];
    }

})(angular);
