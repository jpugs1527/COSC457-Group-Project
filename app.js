/**
 * Module dependencies.
 */
var express = require("express"),
  routes = require("./routes"),
  user = require("./routes/user"),
  http = require("http"),
  path = require("path");
//var methodOverride = require('method-override');
var session = require("express-session");
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
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);

// development only
app.get("/", routes.index); //call for main index page
app.get("/signup", user.signup); //call for signup page
app.post("/signup", user.signup); //call for signup post
app.get("/login", routes.index); //call for login page
app.post("/login", user.login); //call for login post
app.get("/home/dashboard", user.dashboard); //call for dashboard page after login
app.get("/home/logout", user.logout); //call for logout
app.get("/home/profile", user.profile); //to render users profile
app.get("/home/inventory", user.inventory); //to render dealer inventory
app.get("/home/upload", user.upload); //to render the upload page
app.post("/home/upload", user.upload); //call for upload post
app.get("/home/services", user.services); //to render the services page
app.get("/home/scheduleService", user.scheduleService); //render schedule service page
app.post("/home/scheduleService", user.scheduleService); //call for schedule service post
app.get("/home/contact", user.contact);  //render contact page
app.post("/home/contact", user.contact);  //call to post contact form to manager table

//Middleware
app.listen(8082);
