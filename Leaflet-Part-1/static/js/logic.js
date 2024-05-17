
//API end point for fetching earthquake data for past 30 days M2.5+ Earthquakes in GeoJSON format

'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson'

//Define map object with options-San Francisco
const myMap=L.map("map",{
    center: [37.7166, -122.2830],
    zoom: 7
  });

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Use d3 to get the data.
let geoData='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson'

//Create a function to determine color based on depth
function getColor(depth) {
    return depth > 90 ? '#ea2c2c' :
           depth > 70 ? '#ea822c' :
           depth > 50 ? '#ee9c00' :
           depth > 30 ? '#eecc00' :
           depth > 10 ? '#d4ee00' :
           '#98ee00'; 
};

//Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

d3.json(geoData).then(data=>{
    L.geoJSON(data,{
        pointToLayer:(feature,latlng)=>{
        //Define marker options based on earthquake properties
        let depth = feature.geometry.coordinates[2];
        let radius = feature.properties.mag*3;
        return L.circleMarker(latlng,{
            radius: radius,
            fillColor: getColor(depth),
            color:'black',
            weight:1,
            opacity:1,
            fillOpacity:0.7
        }).bindPopup(`<h4>${feature.properties.place}</h4><hr>
        <p>${new Date(feature.properties.time)}</p>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${depth} km</p>`);
        }
    }).addTo(myMap);
});


let legend = L.control({
    position: "bottomright"
})

legend.onAdd= function () {
    let div = L.DomUtil.create("div", "info legend");
    const title = "Earthquake Depths in km"; // Define the title text
    let grades = [-10, 10, 30, 50, 70 ,90];
    let colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // Add title to the legend
    div.innerHTML = `<h4>${title}</h4>`;
for (let i = 0 ; i < grades.length; i ++) {
    div.innerHTML += " <li style = 'background: " + colors[i] +  "'></li>"
    + grades[i] + ( grades[i +1] ? "&ndash;" + grades[i +1 ] + "<br>" : "+");
}
return div;
}
legend.addTo(myMap);

