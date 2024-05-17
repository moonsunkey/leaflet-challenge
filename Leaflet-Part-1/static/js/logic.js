
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

// //Define layer groups for base and overlay layers
// const baseMaps={
//     Street Map:street,
//   
// };

// const overlayMaps={
//     Earthquakes: earthquakes
// }
// 

// //Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
// const mag = feature.properties.mag
// //Find the depth of the earth -the third coordinate for each earthquake.

// const depth = d3.json(queryurl).Feature.geometry.coordinates[2]
// //Include popups that provide additional information about the earthquake when its associated marker is clicked.





//Create a legend that will provide context for your map data.

// let legend = L.control({ position: "bottomright" });
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");
//   let limits = [-10,10,30,50,70,90,100];
//   let labels = [];

//   // Create header for the legend
//   div.innerHTML = '<h4>Depth (km)</h4><ul>';

//   // Add color blocks with labels
//   for (let i = 0; i < limits.length - 1; i++) {
//       let color = getColor(limits[i]);
//       div.innerHTML += `<li style="background-color: ${color};">${limits[i]}-${limits[i+1]}</li>`;
//   }

//   // Close the list HTML
//   div.innerHTML += '</ul>';
//   return div;
// };

// // // Adding the legend to the map
// legend.addTo(myMap);

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

