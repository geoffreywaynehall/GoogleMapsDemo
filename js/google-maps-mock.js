window.google = {
	maps: {
		LatLng: function(lat, lng) {
			return {
				latitude: parseFloat(lat),
				longitude: parseFloat(lng),

				lat: function() { return this.latitude; },
				lng: function() { return this.longitude; }
			};
		},
		LatLngBounds: function(ne, sw) {
			return {
				getSouthWest: function() { return sw; },
				getNorthEast: function() { return ne; }
			};
		},
		GeocoderStatus: {
			OK:"_.ga",
			UNKNOWN_ERROR:"_.ja",
			OVER_QUERY_LIMIT:"_.ha",
			REQUEST_DENIED:"_.ia",
			INVALID_REQUEST:"_.ba",
			ZERO_RESULTS:"_.ka",
			ERROR:"_.aa"
		},
		Thing: {
			geometry:{
				location: "here"
			}
		},
		Geocoder: function() {
			return {
				geocode: function(add, cb) {
					if(add["address"] != ""){
						cb([google.maps.Thing], google.maps.GeocoderStatus.OK);
					}
					else {
						cb([], google.maps.GeocoderStatus.ERROR);
					}
				}
			};
		},
		OverlayView: function() {
			return {};
		},
		InfoWindow: function() {
			return {};
		},
		MapTypeId: function() {
			ROADMAP: 1
		},
		Marker: function() {
			return {};
		},
		MarkerImage: function() {
			return {};
		},
		Map: function() {
			return {
				setCenter: function() {
					return{};
				}
			};
		},
		Point: function() {
			return {};
		},
		Size: function() {
			return {};
		}
	}
};
