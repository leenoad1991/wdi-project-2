"use strict";function init(){initMap()}function initMap(){var n={lat:37.4786298,lng:-125.6627441};addMarkers(new google.maps.Map(document.getElementById("map"),{zoom:5,center:n}))}function addMarkers(n){$.get("http://localhost:3000/spots").done(function(t){t.forEach(function(t){console.log(t);var o={lat:t.lat,lng:t.lng};new google.maps.Marker({position:o,map:n})})})}$(init);