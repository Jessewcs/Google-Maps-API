// set map options

var mylatlng = {lat: 40.7128, lng: -74.0060};
var mapOptions = {
    center: mylatlng,
    zoom: 7,
    mapTypeId: google.maps.mapTypeId.ROADMAP
};


// create the Map

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)