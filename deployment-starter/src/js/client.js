const google = google;

$(init);

function init() {
  getFlikrPhotos();
  initMap();
  const video = document.getElementById('video');
  if (video) {
    video.currentTime = 10;
    video.play();
  }
}

function getFlikrPhotos() {
  var lat = $('.lat').text();
  var lon = $('.lon').text();
  console.log(lat, lon);
  if ((lat) && (lon)) {
    $.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b630c0b08a57f8c570460f2b9694285f&lat=${lat}&lon=${lon}&min_taken_date=1420070400&format=json&nojsoncallback=?`)
    .done(data => {
      console.log(data.photo);
      data.photos.photo.forEach(photo => {
        console.log(photo);
        $(`<img src="http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">`).appendTo($('.photoContainer'));
        // http://farm3.static.flickr.com/2531/3729689790_ea9c38a675_b.jpg
      });
    });
  }
}



function initMap() {

  var California = {lat: 37.4786298, lng: -125.6627441};
  const mapCanvas = document.getElementById('map');
  if (mapCanvas) {
    console.log('map');
    console.log(mapCanvas);
    var map = new google.maps.Map(mapCanvas, {
      styles: [
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "white"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "color": "white"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#4EBCBC"
            },
            {
              "visibility": "on"
            }
          ]
        }
      ],
      zoom: 5,
      center: California

      //
      // map.panTo (lat: 37.4786298, lng: -125.6627441)
    });
    addMarkers(map);
  }
}

function addMarkers(map) {
  $.get('http://localhost:3000/spots')
  .done(spots => {
    spots.forEach(spot => {
      const location = {lat: spot.lat, lng: spot.lng};
      var marker = new google.maps.Marker({
        position: location,
        map: map


      });

      const formattedCounty = spot.countyName.toLowerCase().split(' ').join('-');

      $
      .get(`http://api.spitcast.com/api/county/water-temperature/${formattedCounty}/`)
      .done(data => {
        spot.celcius = data.celcius;

        const contentString = `
        <div id="content">
        <h1 id="firstHeading" class="firstHeading">${spot.name}</h1>
        <h2>Temperature: ${spot.celcius}</h2>
        <a href="/spots/${spot._id}">View Spot</a>
        <div id="bodyContent">
        </div>
        </div>
        `;

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
    });
  });
}


//Sort pan.to out.
//make a logo?
//Do read me.
//make map and text colour the same.
//put photos in grid or something?
