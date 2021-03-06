import * as d3 from 'd3'
//import {geoMercator, geoPath} from "https://cdn.skypack.dev/d3-geo@3";
//pour différence en fonction du lieu :
import regions2012 from '../data/2012-regions.csv'
import regions2014 from '../data/2014-regions.csv'
import regions2016 from '../data/2016-regions.csv'

import jsonCantons from '../data/cantons2.json'

let tessinFemme;
let zurichFemme;
let suisseCentraleFemme;
let regionLemaniqueFemme;
let estSuisseFemme;
let nordSuisseFemme;
let moyenPaysFemme;

let tessinHomme;
let zurichHomme;
let suisseCentraleHomme;
let regionLemaniqueHomme;
let estSuisseHomme;
let nordSuisseHomme;
let moyenPaysHomme;

regions2016.forEach(d => {
  if (d[""] == "Femme") {
    tessinFemme = d['Ticino'];
    zurichFemme = d["Zürich"];
    suisseCentraleFemme = d["Zentralschweiz"];
    regionLemaniqueFemme = d["Région lémanique"];
    estSuisseFemme = d["Ostschweiz"];
    nordSuisseFemme = d["Nordwestschweiz"];
    moyenPaysFemme = d["Espace Mittelland"];

  }
  if (d[""] == "Homme") {
    tessinHomme = d['Ticino'];
    zurichHomme = d["Zürich"];
    suisseCentraleHomme = d["Zentralschweiz"];
    regionLemaniqueHomme = d["Région lémanique"];
    estSuisseHomme = d["Ostschweiz"];
    nordSuisseHomme = d["Nordwestschweiz"];
    moyenPaysHomme = d["Espace Mittelland"];
  }
});


const ecartTessin = Math.abs(tessinHomme - tessinFemme);
const ecartZurich = Math.abs(zurichHomme - zurichFemme);
const ecartSuisseCentrale = Math.abs(suisseCentraleHomme - suisseCentraleFemme);
const ecartLeman = Math.abs(regionLemaniqueHomme - regionLemaniqueFemme);
const ecartEst = Math.abs(estSuisseHomme - estSuisseFemme);
const ecartNord = Math.abs(nordSuisseHomme - nordSuisseFemme);
const ecartMoyenPays = Math.abs(moyenPaysHomme - moyenPaysFemme);


function afficherDifferenceRegions() {
  //Visualiser les données 
  //initalistion du svg
  const margin = {
    top: 50,
    right: 10,
    bottom: 0,
    left: 100
  }

  const width = 700 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  const svg = d3.select('#page3').append('svg').attr('class', 'graph');

  svg.attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Rayons des cercles
  //const data = [ecartTessin, ecartZurich, ecartSuisseCentrale, ecartLeman, ecartEst, ecartNord, ecartMoyenPays];
  //Position sur la carte 
  const locaTessin = [46.20138762802071, 8.93226288914854];
  const locaZurich = [47.38928914731873, 8.536712986104558];
  const locaSuisseCentrale = [47.03118289193014, 8.299743562306285];
  const locaLeman = [46.5087767098146, 6.44902708297979];
  const locaEst = [46.968268635848325, 9.427526565874263];
  const locaNord = [47.563803708612724, 8.113803220375177];
  const locaMoyPays = [47.11139938540512, 7.369471776392901];

  let projection = d3.geoMercator()
  .translate([width/2, height/2])
  .rotate([-7.43864, -46.95108, 0])
  .center([0.54, -0.1])
  .scale(10500)

  let projectionCercles = d3.geoMercator()
  .translate([width, height])
  .center([0.54, -0.1])
  .scale(0.5)


  let div = d3.select("#page3")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px") 

   //Tessin
 svg.append('circle')
 .attr("cx", 370)
 .attr("cy", 420)
 .attr("fill", "MediumPurple")
 .attr("r", ecartTessin/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("Au tessin, l'écart salarial s'élève à " + ecartTessin + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})
 //Zurich 
 svg.append('circle')
 .attr("cx", 400)
 .attr("cy", 240)
 .attr("fill", "MediumPurple")
 .attr("r", ecartZurich/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("A Zurich, l'écart salarial s'élève à " + ecartZurich + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})
 //Leman
 svg.append('circle')
 .attr("cx", 65)
 .attr("cy", 395)
 .attr("fill", "MediumPurple")
 .attr("r", ecartLeman/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("Dans la région lémanique, l'écart salarial s'élève à " + ecartLeman + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})
 //Est
 svg.append('circle')
 .attr("cx", 500)
 .attr("cy", 315)
 .attr("fill", "MediumPurple")
 .attr("r", ecartEst/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("A l'Est de la Suisse, l'écart salarial s'élève à " + ecartEst + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})
 //Nord
 svg.append('circle')
 .attr("cx", 210)
 .attr("cy", 220)
 .attr("fill", "MediumPurple")
 .attr("r", ecartNord/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("Au Nord de la Suisse, l'écart salarial s'élève à " + ecartNord + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})

 //Moyen Pays
 svg.append('circle')
 .attr("cx", 195)
 .attr("cy", 310)
 .attr("fill", "MediumPurple")
 .attr("r", ecartMoyenPays/30)
 .on("mouseover", function (event, d) {

  div.transition()
    .duration(200)
    .style("opacity", 9);
  div.html("Dans la région du Moyen Pays, l'écart salarial s'élève à " + ecartMoyenPays + " CHF")
  .style("left", (event.clientX) + "px")
  .style("top", (event.clientY) + "px");
})
.on("mouseout", function (d) {
  div.transition()
    .duration(500)
    .style("opacity", 0);
})


  //Afficher une carte ?????????????????????????????????????????????????????????????
  //Avec d3 (cours et https://github.com/d3/d3-geo): 




                

  console.log(projection(locaTessin)[1])

  let group = svg.append("g")
    .attr("id", "map")

/*   let cantons = group
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none") */
  let path = d3.geoPath()
  .projection(projection);

  /* let geojson = jsonCantons.feature(topology, topology.objects.cantons)
 */

  let c = group.selectAll("path")
    .data(jsonCantons.features)
    .enter()
    .append('path')
    .attr("d", path)
    .attr("fill","none")
    .attr("stroke", "black")
    .attr("stroke-width", 1)

console.log(ecartEst, ecartLeman)



  //avec Leaflet : https://www.youtube.com/watch?v=wzsQj0ssC5M
  /* var map = L.map('page3').setView([51.505, -0.09], 13);
  
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar', 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map); */


  //https://www.datavis.fr/d3js/map-firststep
  /* const path = d3.geoPath();
  
  const projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2600)
    .translate([width / 2, height / 2]);
  
    path.projection(projection);
  
   
  svg.attr("id", "svg")
    .attr("width", width)
    .attr("height", height);
  
  
  const deps = svg.append("g");
  d3.json('https://raw.githubusercontent.com/ZHB/switzerland-geojson/master/country/switzerland.geojson').then(function(geojson) {
    deps.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "white")
      .attr("stroke-width",1);
  }); */


  //https://observablehq.com/@idris-maps/la-cartographie-avec-d3
  /* 
  
  const cantons = jsonCantons.features;
  const cantonsBbox = turf.bbox(cantons);
  console.log(cantons, cantonsBbox)
   
    const [xMin, yMin, xMax, yMax] = cantonsBbox
    
    // des fonctions pour projeter un point
    const projectX = x => (x - xMin) / (xMax - xMin) * WIDTH
    const projectY = y => HEIGHT - (y - yMin) / (yMax - yMin) * HEIGHT
    
    const projection = d3.geoTransform({
      point: function(x, y) {
        this.stream.point(projectX(x), projectY(y)) // utiliser les fonctions
      }
    })
    const pathCreator = d3.geoPath().projection(projection)
    
    svg.selectAll('path')
      .data(cantons.features)
      .enter()
      .append('path')
      .attr('d', pathCreator)
    
    // les coordonnées de la gare d'Yverdon
    const yverdon = [2539070, 1181442]
  
    // projeter le point
    const yverdonX = projectX(yverdon[0])
    const yverdonY = projectY(yverdon[1])
    
    // dessiner le point
    svg.append('circle')
      .attr('cx', yverdonX)
      .attr('cy', yverdonY)
      .attr('r', 10)
      .attr('fill', 'red') */






}

export default afficherDifferenceRegions;