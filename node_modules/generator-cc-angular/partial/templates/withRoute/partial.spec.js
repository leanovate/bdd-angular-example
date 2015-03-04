describe('<%= ctrlname %>', function() {

    beforeEach(module('<%= appname %>'));

    var $scope, <%= controllerAs %>;

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        <%= controllerAs %> = _$controller_('<%= ctrlname %>', {$scope: $scope});
    }));

    it('should ...', function() {
        //expect(<%= controllerAs %>.myModel).toEqual();
        expect(1).toEqual(1);

    });

});
