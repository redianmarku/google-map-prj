
window.onload = () => {
	displayStores();

}

var map;
var markers = [];
var infoWindow;
var locationSelect;



function initMap() {

            var losAngeles = {
            	lat: 34.063380,
            	lng: -118.358080
            };

            map = new google.maps.Map(document.getElementById('map'), {
              center: losAngeles,
              styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
            });


            infoWindow = new google.maps.InfoWindow();
            showStoresMarker();


          }




function displayStores(){
	var storesHtml = '';
	for(var [index, store] of stores.entries()){
		var address = store['addressLines'];
		var phone = store['phoneNumber'];
		storesHtml += `
		<div class="store-container">
	      <div class="store-info-container">
	          <div class="store-address">
	            <span>${address[0]}</span> 
	            <span>${address[1]}</span> 
	          </div>
	          <div class="store-phone-number">
	            ${phone}
	          </div>
	        </div>
          <div class="store-number-container">
            <div class="store-number">${index+1}</div>
          </div>
        </div>
      </div>
		`
		document.querySelector('.stores-list').innerHTML = storesHtml;
	}
}

function showStoresMarker(){
	var bounds = new google.maps.LatLngBounds();
	for(var [index, store] of stores.entries()){
		var latlng = new google.maps.LatLng(
            store['coordinates']['latitude'],
            store['coordinates']['longitude']);

		var name = store['name'];
		var open = store['openStatusText'];
		var phone = store['phoneNumber'];
		var address = store['addressLines'][0];
		bounds.extend(latlng);
		createMarker(latlng, name, address, index+1, open, phone)
	}
	map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index, open, phone) {
	  var html = `

	  <b>${name}</b>
	  <br>${open}
	  <hr>
	  <a href='https://www.google.com/maps/dir/?api=1&origin=${origin}+WA&destination=Pike+Place+Market+Seattle'><i class='fas fa-location-arrow'></i>${address}</a>
	  <br>
	  <i class='fas fa-phone-alt'></i>${phone}


	  `;
	  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	  var marker = new google.maps.Marker({
	    map: map,
	    position: latlng,
	    label: index.toString(),
	    draggable: true,
    	animation: google.maps.Animation.DROP,
    	icon:image,
	  });
	  google.maps.event.addListener(marker, 'click', function() {
	    infoWindow.setContent(html);
	    infoWindow.open(map, marker);
	  });
	  markers.push(marker);

}

