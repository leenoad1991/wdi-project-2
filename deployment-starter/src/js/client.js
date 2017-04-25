function init() {
  initMap();
}

function initMap() {
  var California = {lat: 37.4786298, lng: -125.6627441};
  var map = new google.maps.Map(document.getElementById('map'), {
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
    spots.forEach(spot => {
      console.log(spot);
      const location = {lat: spot.lat, lng: spot.lng};
      // console.log(surfspots);
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
    });
  });
}

//
// function addMarkers(map) {
//   $.get('http://api.spitcast.com/api/county/water-temperature/orange-county/')
//   .done(data => {
//     console.log(data.celcius);
//     const surfSpots = {lat: county.latitude,lng: county.longitude};
//     var marker = new google.maps.Marker({
//       position: surfSpots,
//       map: map
//     });
//   });
// }


$(init);


//make pop up
//
