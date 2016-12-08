// Angular
var app = angular.module('map', []);

var f = function(){};

// Directive
app.directive("mapDirective", function() {
  return {
	 templateUrl: "template/search.html"
  }

});


app.controller('mapController', function($scope){

	$scope.address = "";

	$scope.saved = localStorage.getItem('places');
	$scope.places = (localStorage.getItem('places')!==null) ? JSON.parse($scope.saved) : [ {text: 'Columbus, OH'}, {text: 'Westerville, OH'} ];
	localStorage.setItem('places', JSON.stringify($scope.places));

	$scope.keyPress = function($event){
		var keyCode = $event.which || $event.keyCode;
		if (keyCode === 13) {
			Map.codeAddress($scope.address,f);
		}
	};

	$scope.construct = function(){
		Map.construct(f);
	};

	$scope.codeAddress = function(){
		Map.codeAddress($scope.address,f);
	};

	$scope.saveAddress = function(){
		$scope.places.push({
			text: $scope.address
		});
		//$scope.todoText = '';
		localStorage.setItem('places', JSON.stringify($scope.places));
	};

	$scope.searchAddress = function(p){
		Map.codeAddress(p,f);
	};

	$scope.removeAddress = function(p){
		var oldPlaces = $scope.places;
		$scope.places = [];
		angular.forEach(oldPlaces, function(place){
			if (!(place.text == p))
				$scope.places.push(place);
		});
		localStorage.setItem('places', JSON.stringify($scope.places));
	};

});

//Javascript (vanilla)
var map;
var geocoder;

var Map = {

	construct: function(cb) {
		geocoder = new google.maps.Geocoder();

		var latlng = new google.maps.LatLng(37.235065, -115.811117);

		var mapOptions = {
		zoom : 8,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		fullscreenControl : true
		};

		map = new google.maps.Map(document.getElementById("map"), mapOptions);

		cb(true);

	},

	codeAddress: function(address, cb) {

		geocoder.geocode({ 'address' : address }, function(results, status) {

			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({ map : map, position : results[0].geometry.location });
				cb(true);
			}

			else {
				alert("Geocode was not successful for the following reason: " + status);
				cb(false);
			}

			cb(false);

		});
	}
}
