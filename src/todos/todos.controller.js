(function(angular) {
    'use strict';

    angular.module('todos').controller('TodosCtrl', TodosCtrl);

    function TodosCtrl(TodoListService) {
        var td = this;
        td.addTodo = addTodo;

        init();

        function init() {
            td.todoList = [];
            TodoListService.get().then(function(todos) {
                td.todoList = todos;
            });
        }

        function addTodo(todo) {
            TodoListService.add(todo).then(function(todos) {
                td.todoList = todos;
            });
        }
    }
})(angular);
