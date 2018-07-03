function styleInfo() {
    return {
        radius: 10,
        fill: "#fff",
        color: "blue",
        weight: 1,
        opacity: 0.9,
        fillOpacity: 1
    }
}

// Creating map object
var myMap = L.map("map", {
    center: [33.571111,  36.404722],
    zoom: 3
});

// Adding tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    accessToken: 'pk.eyJ1IjoidGRhbHRvbjEwMTAiLCJhIjoiY2ppZG9seXd1MDA4NDN3cGducGhqMnJvaiJ9.wPK5zXCCkvGxRp8cDQELmA',
    id: 'mapbox.streets',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(myMap);

d3.csv("../data/PreviousAttacks_Rev.csv", function (error, data) {
    if (error) return console.warn(error);

    console.log('data: ', data);

    var circleMarkers = []

    for (var i = 0; i < data.length; i++) {
        // console.log(data[i].killed)
        var currentLocation = {
            location: data[i].location,
            summary: data[i].Summary,
            latlong: [parseFloat(data[i].latitude), parseFloat(data[i].longitude)],
            killed: parseInt(data[i]["Killed"]),
            injured: parseInt(data[i]["Injured"]),
            date: data[i].date
        }
        // console.log(typeof(currentLocation.killed))
        console.log(currentLocation.summary)

        if (!isNaN(currentLocation.latlong[1]) && !isNaN(currentLocation.killed)
        ) 

            
        {   if (currentLocation.killed > 200000) 
            {var coefficient = 5;} else {var coefficient = 1;}
            // } else if (currentLocation.killed > 20000) {
            //     var efficient = 10;
            // } else if (currentLocation.killed > 2000) {
            //     var efficient = 1;
            

            // console.log(currentLocation);
            L.circle(currentLocation.latlong, {
                    radius: currentLocation.killed/coefficient,
                    fill: "blue",
                    opacity: 1,
                    color: "red"
                }).addTo(myMap)
                .bindPopup("<h3>" + "Location: " + currentLocation.location + "<h3>" + "Deaths: " + currentLocation.killed + "<h3>" + "Injured: " + currentLocation.injured + "<h3>" +"Date: " + currentLocation.date + "<h3>" + "Summary: " + currentLocation.summary);
        }
        // create a layer group made from the bike markers array, pass it into the createMap function
        circleMarkers.push(circleMarkers);
    }
    //   createMap(L.layerGroup(circleMarkers));
})

