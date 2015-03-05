describe('TodosCtrl', function() {

    beforeEach(module('todos'));

    var $scope, todoListServiceMock;

    todoListServiceMock = function() {
        var todos = [];
        return {
            get: function() {
                return todos;
            },
            add: function(todo) {
                todos.push(todo);
            }
        };
    };

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        var tdInstance = false;

        // create helper function to init controller
        this.td = function() {
            if(!tdInstance) {
                tdInstance = _$controller_('TodosCtrl', {TodoListService: todoListServiceMock});
            }

            return tdInstance;
        };

        this.mockTodo = {
            name: 'mock todo',
            done: false
        };
    }));

    it('should have an empty to do list on init', function() {
        // create spy for the mock service to return empty list
        spyOn(todoListServiceMock, 'get').and.returnValue([]);

        expect(this.td().todoList).toBeDefined();
        expect(this.td().todoList).toEqual([]);
        expect(todoListServiceMock.get).toHaveBeenCalled();
    });

    it('should have an addTodo function', function() {
        expect(this.td().addTodo).toBeAFunction();
    });

    it('should call TodoListService when addTodo was called', function() {
        spyOn(todoListServiceMock, 'get').and.callThrough();
        spyOn(todoListServiceMock, 'add').and.callThrough();

        this.td().addTodo(this.mockTodo);
        expect(todoListServiceMock.add).toHaveBeenCalledWith(this.mockTodo);
        // one call for init, one for updating
        expect(todoListServiceMock.get.calls.count()).toEqual(2);
        expect(this.td().todoList).toEqual([this.mockTodo]);
    });
});
