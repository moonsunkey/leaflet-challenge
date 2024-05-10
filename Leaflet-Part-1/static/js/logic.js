
//API end point for fetching earthquake data for past 30 days M4.5+ Earthquakes in GeoJSON format

'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

//Define map object with options-Bali, Indonesia
const myMap=L.map("map",{
    center: [-8.75, 116.37],
    zoom: 12
  });

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Use d3 to get the data and add it to the map.
let geoData='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

d3.json(geoData).then(data=>{ 
    L.geoJSON(data,{
        onEachFeature:(feature,layer)=> {
        layer.bindPopup(`<h4>${feature.properties.place}</h4><hr><p>${new Date(feature.properties.time)}</p>`)
    }
    }).addTo(myMap);
});


// //Create a function of map

// function createMap(earthquakedata) {
//     //Define base layers for street and topograhic maps
//     const street = L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
//     const topo = L.topoLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenTopoMap, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
//     });
// }

// //Create earthquake layer using GeoJSON data
// const earthquakes = L.geoJSON(earthquakedata, {
//     onEachFeature: (feature,layer) =>layer.bindPopUp(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
// });



// //Define layer groups for base and overlay layers
// const baseMaps={
//     Street Map:street,
//     Topographic Map:topo
// };

// const overlayMaps={
//     Earthquakes: earthquakes
// }
// //Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

// //Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
// const mag = feature.properties.mag
// //Find the depth of the earth -the third coordinate for each earthquake.

// const depth = d3.json(queryurl).Feature.geometry.coordinates[2]
// //Include popups that provide additional information about the earthquake when its associated marker is clicked.

// //Create a legend that will provide context for your map data.