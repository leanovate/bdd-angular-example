describe('core', function() {
    describe('state', function() {
        var controller;
        var views = {
            four0four: 'appCore/404.html'
        };

        var $location, $rootScope, $state;

        beforeEach(module('appCore'));
        beforeEach(inject(function(_$location_, _$rootScope_, _$state_, _$templateCache_) {

            _$templateCache_.put(views.four0four, '404');
            $location = _$location_;
            $rootScope = _$rootScope_;
            $state = _$state_;
        }));

        it('should map /404 route to 404 View template', function() {
            expect($state.get('404').templateUrl).toEqual(views.four0four);
        });

        it('of dashboard should work with $state.go', function() {
            $state.go('404');
            $rootScope.$apply();
            expect($state.is('404'));
        });

        it('should route /invalid to the otherwise (404) route', function() {
            $location.path('/invalid');
            $rootScope.$apply();
            expect($state.current.templateUrl).toEqual(views.four0four);
        });
    });
});
