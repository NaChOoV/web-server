const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b2398e024d7ac9ba12886037db89ec5c&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find api coordinates, try again.", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search..", undefined);
    } else {
      const forecast =
        body.current.weather_descriptions[0] +
        ". It's currently " +
        body.current.temperature +
        " degress out. And feelslike " +
        body.current.feelslike +
        " degress.";

      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
