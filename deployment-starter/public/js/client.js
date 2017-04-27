"use strict";function init(){getFlikrPhotos(),initMap();var e=document.getElementById("video");e&&(e.currentTime=10,e.play())}function getFlikrPhotos(){var e=$(".lat").text(),t=$(".lon").text();console.log(e,t),e&&t&&$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b630c0b08a57f8c570460f2b9694285f&lat="+e+"&lon="+t+"&min_taken_date=1420070400&format=json&nojsoncallback=?").done(function(e){console.log(e.photo),e.photos.photo.forEach(function(e){console.log(e),$('<img src="http://farm'+e.farm+".static.flickr.com/"+e.server+"/"+e.id+"_"+e.secret+'.jpg">').appendTo($(".photoContainer"))})})}function initMap(){var e={lat:37.4786298,lng:-125.6627441},t=document.getElementById("map");if(t){console.log("map"),console.log(t);addMarkers(new google.maps.Map(t,{styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}],zoom:5,center:e}))}}function addMarkers(e){$.get("http://localhost:3000/spots").done(function(t){t.forEach(function(t){var o={lat:t.lat,lng:t.lng},i=new google.maps.Marker({position:o,map:e}),n=t.countyName.toLowerCase().split(" ").join("-");$.get("http://api.spitcast.com/api/county/water-temperature/"+n+"/").done(function(o){t.celcius=o.celcius;var n='\n        <div id="content">\n        <h1 id="firstHeading" class="firstHeading">'+t.name+"</h1>\n        <h2>Temperature: "+t.celcius+'</h2>\n        <a href="/spots/'+t._id+'">View Spot</a>\n        <div id="bodyContent">\n        </div>\n        </div>\n        ',l=new google.maps.InfoWindow({content:n});i.addListener("click",function(){l.open(e,i)})})})})}var google=google;$(init);