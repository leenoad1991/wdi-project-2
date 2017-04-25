// 1a5dcda526d0e910cf224214364a0669
// ab491f2fcec88785

const google = google;

function init() {
  initMap();
}

function initMap() {
  var California = {lat: 37.4786298, lng: -125.6627441};
  const mapCanvas = document.getElementById('map');
  console.log(mapCanvas);
  var map = new google.maps.Map(mapCanvas, {
    zoom: 5,
    center: California
    // map.setZoom(17);
    // map.panTo(California);
  });
  addMarkers(map);
}

function addMarkers(map) {
  $.get('http://localhost:3000/spots')
  .done(spots => {
    // console.log(spots);
    spots.forEach(spot => {
      // console.log(spot.spotId);
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

        // var contentString = '<div id="content">'+
        // `<h1 id="firstHeading" class="firstHeading">${spot.name}</h1>`+
        // `<h2>Temperature: ${spot.celcius}</h2>`+
        // // '<button type="button">Surfed here? Add a comment...!</button>'+
        // <a href="/spots/<%= spot.id %>/comments">Post a Comment</a>
        // '<div id="bodyContent">'+
        // '</div>'+
        // '</div>';

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

        // console.log('clicked');
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });

      // $
      // .get(`http://api.spitcast.com/api/county/tide/${formattedCounty}/`)
      // .done(data => {
      //   console.log(data);
      // });
      // //

    });

  });
}

$(init);

//create link in box that allows users to add comment on new page.
