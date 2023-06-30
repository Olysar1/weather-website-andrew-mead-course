const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8edbafc07721ad541af73f59b76968be&query=${lat},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const dataBodyCurrent = body.current;
      callback(
        undefined,
        `The weather at this moment is ${dataBodyCurrent.weather_descriptions[0]}. It is ${dataBodyCurrent.temperature} degrees out. Feels like ${dataBodyCurrent.feelslike}. The humidity level is ${dataBodyCurrent.humidity}. The wind is blowing from ${dataBodyCurrent.wind_dir} (${dataBodyCurrent.wind_degree} degrees). A treat for fishermen: The pressure is ${dataBodyCurrent.pressure}.`
      );
    }
  });
};

module.exports = forecast;
