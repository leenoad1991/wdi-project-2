$(init);
let surfSpots;



function init() {
  initMap();
}

function initMap() {
  var California = {lat: 37.4786298, lng: -125.6627441};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: California
    map.setZoom(17);
    map.panTo(curmarker.California);
  })
};


$
.get('http://api.spitcast.com/api/county/spots/orange-county/')
.done(data => {
  console.log(data[0].latitude, data[0].longitude);
  console.log(data[0].spot_name)
  data.forEach(function(county){
    surfSpots = {lat: county.latitude, lng: county.longitude};
  console.log(surfspots);
    var marker = new google.maps.Marker({
      position: surfSpots,
      map: map,
    });
  });
});
