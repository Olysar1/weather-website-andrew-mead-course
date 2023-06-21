const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "George Barbakadze",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: " About",
    name: "George Barbakadze",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText:
      "HELP! I need somebody, HELP! not just anybody, HELP! you know I need someone to heeeeelp!",
    title: "Help",
    name: "George Barbakadze",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        forecast: forecastData,
        location,
        address,
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

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    notFoundText: "Help article not found",
    title: "Error code: 404",
    name: "George Barbakadze",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    notFoundText: "Page not found",
    title: "Error code: 404",
    name: "George Barbakadze",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
