

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map, myLatlng;
var x = document.getElementById("demo");

function initialize() {
  myLatlng = new google.maps.LatLng(39.219547, -76.859916);
  var mapOptions = {
    center: myLatlng,
    zoom: 12
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  directionsDisplay.setMap(map);

  var marker = new google.maps.Marker({
    position: myLatlng, 
    map: map, 
    title: 'Dr. Lisa Goldman'
  })

  getLocation();
}

function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(calcRoute);
  } 
}

function calcRoute(position) {
  homeAddr = new google.maps.LatLng(position.coords.latitude, 
           position.coords.longitude);
  var start = homeAddr;
  var end = myLatlng;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


google.maps.event.addDomListener(window, 'load', initialize);

