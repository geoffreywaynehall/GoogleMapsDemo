// describe("Google map service", function() {
// 	describe("create new map", function() {
//
// 		it("returns created", function(done) {
// 			Map.construct(function(response) {
// 			expect(response).toBe(true);
// 			done();
// 			});
// 		});
// 	});
//
// 	describe("fail update", function() {
// 		it("fails to update", function(done) {
// 			Map.codeAddress("", function(response) {
// 			expect(response).toBe(false);
// 			done();
// 			});
// 		});
// 	});
//
// 	describe("update map", function() {
// 		it("updates the map", function(done) {
// 			Map.codeAddress("columbus, oh", function(response) {
// 			expect(response).toBe(true);
// 			done();
// 			});
// 		});
// 	});
// });


describe('Unit testing HTML insert', function() {
  var $compile, $rootScope;

  beforeEach(module('map'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {

    var element = $compile("<map-directive></map-directive>")($rootScope);

    $rootScope.$digest();

    expect(element.html()).toContain('<b>Location</b><br><input type="text" class="address ng-pristine ng-untouched ng-valid ng-empty" ng-model="address" ng-keypress="keyPress($event)"><br><input type="submit" class="find" value="Find" ng-click="codeAddress()"><input type="submit" class="save" value="Save" ng-click="saveAddress()"><br><b>Saved</b><br><!-- ngRepeat: place in places track by $index -->');
  });
});


describe('MapController', function() {
  beforeEach(module('map'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.construct', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('initializes the map', function(done) {
      $scope.construct(function(response){
        expect(response).toEqual(true);
        done();
      });
    });
  });

  describe('$scope.codeAddress', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('fails to update the map', function(done) {
      $scope.address = "";
      $scope.codeAddress(function(response){
        expect(response).toEqual(false);
        done();
      });
    });

    it('succeeds update the map', function(done) {
      $scope.address = "columbus, oh";
      $scope.codeAddress(function(response){
        expect(response).toEqual(true);
        done();
      });
    });
  });

  describe('$scope.searchAddress', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('fails to update the map', function(done) {
      $scope.searchAddress("", function(response){
        expect(response).toEqual(false);
        done();
      });
    });

    it('succeeds update the map', function(done) {
      $scope.searchAddress("columbus, oh", function(response){
        expect(response).toEqual(true);
        done();
      });
    });
  });

  describe('$scope.saveAddress', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('saves an address', function(done) {
      $scope.address = "somewhere";
      expect($scope.places).toEqual([ Object({ text: 'Columbus, OH' }), Object({ text: 'Westerville, OH' }) ]);
      //spyOn(localStorage, "setItem");
      $scope.saveAddress(function(response){
        expect($scope.places).toEqual([ Object({ text: 'Columbus, OH' }), Object({ text: 'Westerville, OH' }), Object({ text: 'somewhere' }) ]);
        expect(response).toEqual(true);
        done();
      });
      //expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('$scope.removeAddress', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('delete an address', function(done) {
      expect($scope.places).toEqual([ Object({ text: 'Columbus, OH' }), Object({ text: 'Westerville, OH' }), Object({ text: 'somewhere' }) ]);
      //spyOn(localStorage, "setItem");
      $scope.removeAddress("somewhere", function(response){
        expect($scope.places).toEqual([ Object({ text: 'Columbus, OH' }), Object({ text: 'Westerville, OH' }) ]);
        expect(response).toEqual(true);
        done();
      });
      //expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('$scope.keyPress', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mapController', { $scope: $scope });
    });

    it('press enter to submit', function(done) {
      var e = new window.KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        shiftKey: true
      });

      delete e.keyCode;

      Object.defineProperty(e, 'keyCode', {'value': 13});

      $scope.keyPress(e, function(response){
        expect(response).toEqual(true);
        done();
      });
    });

    it('press F to fail', function(done) {
      var e = new window.KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        shiftKey: true
      });

      delete e.keyCode;

      Object.defineProperty(e, 'keyCode', {'value': 70});

      $scope.keyPress(e, function(response){
        expect(response).toEqual(false);
        done();
      });
    });
  });
});
