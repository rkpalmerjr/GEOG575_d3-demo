/* Javascript by Kevin Palmer, 2019 */


//Execute script when window is loaded
window.onload = function(){
	//SVG dimension variables
	let w = 900, h = 500;

	//Container block
	let container = d3.select("body") //Get the <body> element from the DOM
		.append("svg") //Put a new svg in the body
		.attr("width", w) //Assign the width
		.attr("height", h) //Assign the height
		.attr("class", "container") //Always assign a class (as the block name) for styling and future selection
		.style("background-color", "rgba(0,0,0,0.2"); //SVG background color

	//Inner-rectangle block
	let innerRect = container.append("rect") //Put a new rect in the svg
		.datum(400)
		.attr("width", function(d){
			return d * 2;
		}) //Rectangle width
		.attr("height", function(d){
			return d;
		}) //Rectangle height
		.attr("class", "innerRect") //Class name
		.attr("x", 50) //Position from the left on the x (horizontal) axis
		.attr("y", 50) //Position from top on the y (vertical) axis
		.style("fill", "#FFFFFF"); //Fill color

	console.log(innerRect);
/*
	//Data Array
	let dataArray = [10, 20, 30, 40, 50];

	let circles = container.selectAll(".circles") //Referencing parameter that doesn't exist creates an empty selection as a placeholder
		.data(dataArray) //Here we feed in an array
		.enter() //A great mystery or some shit - everything after this functions like a loop
		.append("circle") //Add a circle for each datum (each value in the array)
		.attr("class", "circles") //Apply a class name to all circles
		.attr("r", function(d, i){ //Circle radius
			console.log("d:", d, "i:", i);
			return d;
		})
		.attr("cx", function(d, i){ //X coordinate
			return 70 + (i * 180);
		})
		.attr("cy", function(d){ //Y coordinate
			return 450 - (d * 5);
		});
*/
	//City Population Array
	let cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
	];

	//Linear scale GENERATOR
	let x = d3.scaleLinear() //Create the scale
		.range([150, 750]) //Output min and max
		.domain([0, 3]); //Input min and max

	console.log(x);

	//Find the minimum value of the array
	let minPop = d3.min(cityPop, function(d){
		return d.population;
	});

	//Find the maximum value of the array
	let maxPop = d3.max(cityPop, function(d){
		return d.population;
	});

	//Scale for cirles center y coordinate
	let y = d3.scaleLinear()
		.range([450, 50])
		.domain([0, 700000]);

	console.log(y);

	//Color Scale Generator
	let color = d3.scaleLinear()
		.range([
			"#FDBE85",
			"#D94701"
		])
		.domain([
			minPop,
			maxPop
		]);

	let circles = container.selectAll(".circles") //Create an empty selection
		.data(cityPop) //Here we feed in an array
		.enter() //A great mystery or some shit
		.append("circle") //Inspect the HTML
		.attr("class", "circles")
		.attr("id", function(d){
			return d.city;
		})
		.attr("r", function(d){
			//Calculate the radius based on the population value as circle area
			let area = d.population * 0.01;
			return Math.sqrt(area/Math.PI);
		})
		.attr("cx", function(d, i){
			//Use the index to place each circle horizontally
			return x(i);
		})
		.attr("cy", function(d){
			//Subtract value from 450 to "grow" circles up from the bottom
			return y(d.population);
		})
		.style("fill", function(d, i){ //Add a fill based on the color scale generator
			return color(d.population);
		})
		.style("stroke", "#000"); //Black circle stroke

	//Create y axis generator
	let yAxis = d3.axisLeft(y)
		.scale(y);

	//Creeate axis g element and add axis
	let axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50, 0)")
		.call(yAxis);

	//Create a text element and add the title
	let title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("City Populations");

	//Create circle labels
	let labels = container.selectAll(".labels")
		.data(cityPop)
		.enter()
		.append("text")
		.attr("class", "labels")
		.attr("text-anchor", "left")
		.attr("y", function(d){
			//Vertical position centered on each circle
			return y(d.population);
		});

	//First line of label
	let nameLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function(d, i){
			//Horizontal position to the right of each circle
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
		})
		.text(function(d){
			return d.city;
		});

	//Create format generator
	let format = d3.format(",");

	//Second line of label
	let popLine = labels.append("tspan")
		.attr("class", "popLine")
		.attr("x", function(d, i){
			//Horizontal position ot the right of each circle
			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
		})
		.attr("dy", "15") //Vertical offset
		.text(function(d){
			return "Pop. " + format(d.population); //Use format generator to format population
		});
};
