// For bundlers such as Vite and Webpack omit https://esm.sh/
import { csv, json } from 'https://esm.sh/d3-fetch';
import { select, selectAll } from 'https://esm.sh/d3-selection';
import { scaleSqrt, scaleLinear } from 'https://esm.sh/d3-scale';

// Retrieve JSON data from GitHub 
const data = await json("https://anhntang.github.io/Nobel-Prize-Analysis/nobeldata.json");  

// Extract the birth_country column 
// const countries = data.map(function (d) {return d.birth_country;});
// const countries_without_duplicates = [...new Set(countries)];
// console.log(countries_without_duplicates);

// Count the number of Nobel prize winners in each country 
const prizeCounts = {};

data.forEach(d => {
  const country = d.birth_country;
  if (country == ' ') return;
  
  if (!prizeCounts[country]) {
    prizeCounts[country] = 0;
  }
  prizeCounts[country] += 1;
});

console.log(prizeCounts);

// Convert an object into an array of objects 
const data2 = Object.entries(prizeCounts)
  .map(([country, count]) => ({country, count}))
  .sort((a,b) => b.count - a.count)
  .slice(0,15); 
console.log(data2);

// Find the largest count 
let maxCount = 0;
data2.forEach(d => { if (d.count > maxCount)
                  maxCount = d.count; 
}); 

// Use the largest count scale the radii 
const radiusScale = scaleSqrt()
  .domain([0, maxCount])
  .range([0, 50]); 

// Create a color scale 
const colorScale = scaleLinear()
  .domain([0, maxCount])
  .range(["#c7e9c0", "#006d2c"]);

// Make circles
let x = 0;
select("svg")
  .selectAll("circle")
  .data(data2)
  .join("circle")
  .attr("cx", function(d, i) {
    let r = radiusScale(d.count); 
    let cx = x + r;
    x += r * 2 + 35; 
    return cx; 
})
  .attr("cy", 50)
  .attr("r", d => radiusScale(d.count))
  .attr("fill", d => colorScale(d.count));


// Make count labels
x = 0;
select("svg")
  .selectAll(".count-label")
  .data(data2)
  .join("text")
  .attr("class", "count-label")
  .attr("x", function(d, i) {
    let r = radiusScale(d.count);
    let cx = x + r;
    x += r * 2 + 35;
    return cx;
  })
  .attr("y", 55)
  .text(d => d.count)
  .style("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold");

// Make country name labels
x = 0;
let stagger = false;
select("svg")
  .selectAll(".country")
  .data(data2)
  .join("text")
  .attr("class", "country-label")
  .attr("x", function(d, i) {
    let r = radiusScale(d.count);
    let cx = x + r;
    x += r * 2 + 35;
    return cx;
  })
  .attr("y", function() {
    stagger = !stagger;
    return stagger ? 150 : 120;
  })
  .text(d => d.country)
  .style("text-anchor", "middle")
  .style("font-size", "14px")
  .style("font-weight", "semi-bold");


