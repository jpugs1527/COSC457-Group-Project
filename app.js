/**
 * Module dependencies.
 */
var express = require("express"),
  routes = require("./routes"),
  user = require("./routes/user"),
  http = require("http"),
  path = require("path");
//var methodOverride = require('method-override');
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Dealership"
});

connection.connect();

global.db = connection;

// all environments
app.set("port", process.env.PORT || 8082);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index); //call for main index page
app.get("/login", routes.index); //call for login page
app.get("/signup", user.signup); //call for signup page
app.get("/home/dashboard", user.dashboard); //call for dashboard after login

app.post("/login", user.login); //call for login post
app.post("/signup", user.signup); //call for signup post

//Middleware
app.listen(8082);

// Might need this not sure

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
