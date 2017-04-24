console.log("map!");


$(init);

function init() {
initMap();
}

  function initMap() {
    var Uluru = {lat: 37.4786298, lng: -125.6627441};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: Uluru
    });
  }
