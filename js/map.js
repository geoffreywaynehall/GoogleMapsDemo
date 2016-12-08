var app = angular.module('map', []);

var map;
var geocoder;

var page = '<b>Location</b>\
<br/>\
<input type="text" class="address" ng-model="address" ng-keypress="keyPress($event)">\
<br/>\
<input type="submit" class="find" value="Find" ng-click="codeAddress()">\
<input type="submit" class="save" value="Save" ng-click="saveAddress()">\
<br>\
<b>Saved</b>\
<br/>\
<div class = "favs" data-ng-repeat="place in places track by $index">\
<div class="left"><input type="submit" class="place" value="{{place.text}}" ng-click="searchAddress(place.text)"></div>\
<div class="middle"/>\
<div class="right"><input type="submit" class="remove" value="Remove" ng-click="removeAddress(place.text)"></div>\
</div>';


// Directive
app.directive("mapDirective", function() {
  return {

		template: page
  }

});

app.controller('mapController', function($scope){

	$scope.address = "";

	$scope.saved = localStorage.getItem('places');
	$scope.places = (localStorage.getItem('places')!==null) ? JSON.parse($scope.saved) : [ {text: 'Columbus, OH'}, {text: 'Westerville, OH'} ];
	localStorage.setItem('places', JSON.stringify($scope.places));

	$scope.keyPress = function($event, cb){
		var keyCode = $event.which || $event.keyCode;
		if (keyCode === 13) {
			$scope.codeAddress(function(result){
				cb(true);
			});
		}
		cb(false);
	};

	$scope.construct = function(cb){
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
	};

	$scope.codeAddress = function(cb){
		geocoder.geocode({ 'address' : $scope.address }, function(results, status) {

			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({ map : map, position : results[0].geometry.location });
				cb(true);
			}

			else {
				alert("Geocode was not successful for the following reason: " + status);
				cb(false);
			}

		});
	};

	$scope.saveAddress = function(cb){
		$scope.places.push({
			text: $scope.address
		});
		//$scope.todoText = '';
		localStorage.setItem('places', JSON.stringify($scope.places));
		cb(true);
	};

	$scope.searchAddress = function(p, cb){
		geocoder.geocode({ 'address' : p }, function(results, status) {

			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({ map : map, position : results[0].geometry.location });
				cb(true);
			}

			else {
				alert("Geocode was not successful for the following reason: " + status);
				cb(false);
			}

		});
	};

	$scope.removeAddress = function(p, cb){
		var oldPlaces = $scope.places;
		$scope.places = [];
		angular.forEach(oldPlaces, function(place){
			if (!(place.text == p))
				$scope.places.push(place);
		});
		localStorage.setItem('places', JSON.stringify($scope.places));

		cb(true);
	};

});
