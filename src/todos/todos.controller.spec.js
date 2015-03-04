describe('TodosCtrl', function() {

    beforeEach(module('todos'));

    var $scope, td;

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        td = _$controller_('TodosCtrl', {$scope: $scope});
    }));

    it('should ...', function() {
        //expect(td.myModel).toEqual();
        expect(1).toEqual(1);

    });

});
