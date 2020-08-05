const express = require("express"); // express is a function
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000; // new port set by heroku #67

const geocode = require("./util/geocode");
const forecast = require("./util/forecast");

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // express.static takes return value to use where static takes the path to the folder

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Kenny Pham",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Kenny Pham",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help page",
		msg: "This is the help page",
		title: "Help",
		name: "Kenny Pham",
	});
});

// app.get("/weather", (req, res) => {
// 	res.send({
// 		forecast: "New forecast",
// 		location: "Los Angeles",
// 	});
// });

// Challange goal: update weather endpoint to accept address
//
// 1. No address? send back an error msg
// 2. If you have an address, send back the static JSON
//	- Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=houston
// app.get("/weather", (req, res) => {
// 	console.log(req.query.address)
// 	if (!req.query.address) {
// 		return res.send({
// 			error: "You must provide a search term"
// 		})
// 	}
// 	res.send({
// 		forecast: "New forecast",
// 		location: "Los Angeles",
// 		address: req.query.address
// 	})
// })

//
// Goal: Wire up /weather
//
// 1. Require geocode and forecast into app.js
// 2. Usd the address to geocode
// 3. Use the coordinates to get forecast

app.get("/weather", (req, res) => {
	let weatherAddress = req.query.address;
	if (!weatherAddress) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	geocode(weatherAddress, (error, {
		latitude,
		longitude,
		location
	} = {}) => {
		if (error) {
			return res.send({
				error
			});
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}
			res.send({
				forecast: forecastData,
				location,
				address: weatherAddress,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("error", {
		title: "404",
		errorMsg: "Help article not found",
		name: "Kenny Pham",
	});
});

app.get("*", (req, res) => {
	res.render("error", {
		title: "404",
		errorMsg: "Page not found",
		name: "Kenny Pham",
	});
});

// app.listen to run the server
app.listen(port, () => {
	console.log("Listening on port " + port);
});