const google = google;

$(init);

function init() {
  initMap();
  const video = document.getElementById('video');
  video.currentTime = 10;
  video.play();
}

function initMap() {
  var California = {lat: 37.4786298, lng: -125.6627441};
  const mapCanvas = document.getElementById('map');
  console.log('map');
  console.log(mapCanvas);
  var map = new google.maps.Map(mapCanvas, {
    zoom: 5,
    center: California
    // zoom: 5,
    // map.panTo (California)
  });
  addMarkers(map);
}

function addMarkers(map) {
  $.get('http://localhost:3000/spots')
  .done(spots => {
    spots.forEach(spot => {
      const location = {lat: spot.lat, lng: spot.lng};
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        style: [
          {
            'featureType': 'road',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'administrative.province',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'water',
            'stylers': [
              {
                'color': '#004b76'
              }
            ]
          },
          {
            'featureType': 'landscape.natural',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'color': '#fff6cb'
              }
            ]
          },
          {
            'featureType': 'administrative.country',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'color': '#7f7d7a'
              },
              {
                'lightness': 10
              },
              {
                'weight': 1
              }
            ]
          }
        ]

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

//sort markers on map.
//nav bar - space evenly and place in the middle
//sort out 'add a spot'
//Google fonts.
//Sort pan.to out.
