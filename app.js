// Wait until the document, DOM, is fully loaded
window.onload = function() {
    // Set map options
    var myLatLng = { lat: 40.7128, lng: -74.0060 };
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
};

// create a Directions Service object to use the route method and get a result for our request

var directionsService = new google.maps.DirectionsSerivce();

// create a DirectionsDisplay object which we will use to display the route

var directionsDisplay = new google.maps.DirectionsRenderer();

// bind the directionsDisplay to the map

directionsDisplay.setMap(map)

// Create a function here to calculate the distance, the time it will take, and display origin & destination


function calculateDistance() {
    // create a request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, // TRANSIT AIR SEA?
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass the request to the route method
    directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + ".<br />To " + document.getElementById("to").value + ".<br /> Driving Distance <i class='fas fa-road'></i>:" + result.routes[0].legs[0].distance.text + " .<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ". </div>";

        
            // display route
            directionsDisplay.setDirections(result);
        }  else {
            // delete route from map
            directionsDisplay.setDirections({ routes: [] });

            // center map in NYC
            map.setCenter(myLatLng);

            // display error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Erorr! Could not retrieve the distance! </div>";

        }
    });
}


// create seemless auto-complete objects for all user inputs

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("from");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
