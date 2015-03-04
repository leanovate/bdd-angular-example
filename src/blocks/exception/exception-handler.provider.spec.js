/* jshint -W117, -W030 */
describe('blocks.exception', function() {
    var exceptionHandlerProv, $rootScope, $httpBackend;
    var mocks = {
        errorMessage: 'fake error',
        prefix: '[TEST]: '
    };

    beforeEach(module('appCore', function(exceptionHandlerProvider) {
        exceptionHandlerProv = exceptionHandlerProvider;
    }));
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$templateCache_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        _$templateCache_.put('appCore/404.html', '404');
    }));

    beforeEach(function() {
        //module('blocks.exception');
        inject();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$exceptionHandler', function() {
        it('should have a dummy test', function() {
            expect(true).toBeTruthy();
        });

        it('should be defined', inject(function($exceptionHandler) {
            expect($exceptionHandler).toBeDefined();
        }));

        describe('with appErrorPrefix', function() {
            beforeEach(function() {
                exceptionHandlerProv.configure(mocks.prefix);
            });

            it('should have exceptionHandlerProvider defined', inject(function() {
                expect(exceptionHandlerProv).toBeDefined();
            }));

            it('should have appErrorPrefix defined', inject(function() {
                expect(exceptionHandlerProv.$get().config.appErrorPrefix).toBeDefined();
            }));

            it('should have appErrorPrefix set properly', inject(function() {
                expect(exceptionHandlerProv.$get().config.appErrorPrefix)
                    .toEqual(mocks.prefix);
            }));

            it('should throw an error when forced', inject(function() {
                expect(functionThatWillThrow).toThrow();
            }));

            it('manual error is handled by decorator', function() {
                var exception;
                exceptionHandlerProv.configure(mocks.prefix);
                try {
                    $rootScope.$apply(functionThatWillThrow);
                }
                catch (ex) {
                    exception = ex;
                    expect(ex.message).toEqual(mocks.prefix + mocks.errorMessage);
                }
            });
        });
    });

    function functionThatWillThrow() {
        throw new Error(mocks.errorMessage);
    }
});
