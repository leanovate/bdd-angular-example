describe('TodosCtrl', function() {

    beforeEach(module('todos'));

    var $scope, todoListServiceMock;

    beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _$templateCache_) {
        $scope = _$rootScope_.$new();
        var tdInstance = false;
        _$templateCache_.put('appCore/404.html', '404');

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

        todoListServiceMock = (function() {
            var todos = [];
            return {
                get: function() {
                    var deferred = _$q_.defer();
                    deferred.resolve(todos);
                    return deferred.promise;
                },
                add: function(todo) {
                    var deferred = _$q_.defer();
                    todos.push(todo);
                    deferred.resolve(todos);
                    return deferred.promise;
                }
            };
        })();

        spyOn(todoListServiceMock, 'get').and.callThrough();
        spyOn(todoListServiceMock, 'add').and.callThrough();

    }));

    it('should have an empty to do list on init', function() {
        expect(this.td().todoList).toBeDefined();
        expect(this.td().todoList).toEqual([]);
        expect(todoListServiceMock.get).toHaveBeenCalled();
    });

    it('should have an addTodo function', function() {
        expect(typeof this.td().addTodo).toBe('function');
    });

    it('should call TodoListService when addTodo was called', function() {
        this.td().addTodo(this.mockTodo);
        $scope.$apply();
        expect(todoListServiceMock.add).toHaveBeenCalledWith(this.mockTodo);
        // one call for init, one for updating
        expect(todoListServiceMock.get.calls.count()).toEqual(1);
        expect(this.td().todoList).toEqual([this.mockTodo]);
    });
});
