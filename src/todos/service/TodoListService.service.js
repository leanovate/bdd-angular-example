(function(angular, localStorage) {
    'use strict';

    angular.module('todos').service('TodoListService', TodoListService);

    function TodoListService($q) {
        var STORAGE_ID = 'todos-angularjs';

        var todos = [];

        this.clearCompleted = function() {
            var deferred = $q.defer();
            var completeTodos = [];
            var incompleteTodos = [];
            todos.forEach(function(todo) {
                if(todo.completed) {
                    completeTodos.push(todo);
                } else {
                    incompleteTodos.push(todo);
                }
            });

            angular.copy(incompleteTodos, todos);

            _saveToLocalStorage(todos);
            deferred.resolve(todos);

            return deferred.promise;
        };

        this.delete = function(todo) {
            var deferred = $q.defer();

            todos.splice(todos.indexOf(todo), 1);

            _saveToLocalStorage(todos);
            deferred.resolve(todos);

            return deferred.promise;
        };

        this.get = function() {
            var deferred = $q.defer();

            angular.copy(_getFromLocalStorage(), todos);
            deferred.resolve(todos);

            return deferred.promise;
        };

        this.add = function(todo) {
            var deferred = $q.defer();

            todos.push(todo);

            _saveToLocalStorage(todos);
            deferred.resolve(todos);

            return deferred.promise;
        };

        this.put = function(todo, index) {
            var deferred = $q.defer();

            todos[index] = todo;

            _saveToLocalStorage(todos);
            deferred.resolve(todos);

            return deferred.promise;
        };

        function _getFromLocalStorage() {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        }

        function _saveToLocalStorage(todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        }

    }

})(angular, localStorage);
