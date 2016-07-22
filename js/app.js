var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    styles: [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#ffffff"
      }, {
        "weight": "0.20"
      }, {
        "lightness": "28"
      }, {
        "saturation": "23"
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#494949"
      }, {
        "lightness": 13
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#144b53"
      }, {
        "lightness": 14
      }, {
        "weight": 1.4
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#08304b"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0c4152"
      }, {
        "lightness": 5
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#0b434f"
      }, {
        "lightness": 25
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#0b3d51"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "color": "#146474"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#021019"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#ffffff"
      }]
    }],
    center: {
      lat: 40.74135,
      lng: -73.99802
    },
    zoom: 14
  });
  var Locations = [{
    lat: 44.511119,
    lng: -87.998324
  }, {
    lat: 44.511837,
    lng: -87.997935
  }, {
    lat: 44.513576,
    lng: -88.016313
  }, {
    lat: 44.516083,
    lng: -88.015227
  }, {
    lat: 44.511260,
    lng: -87.996378
  }, {
    lat: 44.517012,
    lng: -88.014529
  }];
  var markers = [];

  var Places = ['Skirtz Lounge', 'Cock & Bull Public Haus', 'The Nines', 'Ned Kelly\'s', 'Shenanigans Irish Pub', 'Hagermeister Park'];
  var infoText = [];
  document.getElementById('Loading').style.visibility = 'visible';
  setTimeout(function() {
    document.getElementById('Loading').style.visibility = 'hidden';
    Places.forEach(function(item, index) {
      console.log(PokeArray);
      infoText.push('<h1>' + Places[index] +
        '</h1><br><h2>Most Common Pokemon Here:<br><h1>' +
        PokeArray[index].name + '</h1><br><strong>Type:</strong><h1>' + PokeArray[index].type + '</h1><br></h2><img class="poke" src="' + PokeArray[index].picture + '"/>');
      var liI = document.createElement('li');
      liI.textContent = Places[index];
      liI.setAttribute('data-id', index);
      liI.classList.add('mapLink');
      document.querySelector('#listOfPlaces').appendChild(liI);
    });
    var pinIcon = new google.maps.MarkerImage(
      "./img/martini_marker.png", null, null, null, new google.maps.Size(42, 68)
    );
    var infoWindow = new google.maps.InfoWindow();
    Locations.forEach(function(item, index) {
      console.log(Locations[index]);
      var Marker = new google.maps.Marker({
        map: map,
        icon: pinIcon,
        position: Locations[index],
        title: Places[index],
        animation: google.maps.Animation.DROP,
        id: index
      });
      markers.push(Marker);
      google.maps.event.addListener(Marker, 'click', function() {
        markers.forEach(function(item, indexer) {
          if (indexer != index) {
            item.setAnimation(null);
          }
        });
        map.setCenter(Marker.getPosition());
        infoWindow.setContent(infoText[index]);
        infoWindow.open(map, Marker);
        if (Marker.getAnimation() !== null) {
          Marker.setAnimation(null);
        } else {
          Marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      });
      markers.forEach(function(item, index) {
        var thisMarker = document.querySelector('[data-id="' + index + '"]');
        google.maps.event.addDomListener(thisMarker, 'click', function(ev) {
          map.setCenter(markers[index].getPosition());
        });
      });
    });
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    map.fitBounds(bounds);
  }, 15000);
}