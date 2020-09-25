const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config and setup hdb and view location
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../public/templates/views"));

hbs.registerPartials(path.join(__dirname, "../public/templates/partials"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", {
    tittle: "Weather App",
    name: "Ignacio Fuenzalida",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    tittle: "About Me",
    name: "Ignacio Fuenzalida",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    tittle: "Help",
    helpText: "Contacte a fuenzalida.veas@gmail.com para mayor información.",
    name: "Ignacio Fuenzalida",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        res.send({
          forecast: forecast,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [req.query.search, req.query.rating],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    tittle: "404",
    name: "Ignacio Fuenzalida",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    tittle: "404",
    name: "Ignacio Fuenzalida",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
