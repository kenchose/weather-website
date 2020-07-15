const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	// const url = "http://api.weatherstack.com/current?access_key=a9cbb23fbea6f30824acb039ad0a1d52&query=" + latitude + "," + longitude + "&units=f"
	const url = `http://api.weatherstack.com/current?access_key=a9cbb23fbea6f30824acb039ad0a1d52&query=${latitude},${longitude}&units=f`;

	request({
			url,
			json: true,
		},
		(error, {
			body
		}) => {
			if (error) {
				callback("Unable to connect to weather service!", undefined);
			} else if (body.error) {
				callback("There was an error! " + body.error.info, undefined);
			} else {
				callback(
					undefined,
					body.current.weather_descriptions[0] +
					". It is currently " +
					body.current.temperature +
					" degrees outside, but feels like " +
					body.current.feelslike +
					". Hummidity is " + body.current.humidity + "%"
				);
			}
		}
	);
};

module.exports = forecast;