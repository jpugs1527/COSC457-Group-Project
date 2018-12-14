var crud = require("../js/crud");
var build = new crud();

//---------------------------------------------signup page call------------------------------------------------------
var CrudService = require("./CrudService");
var build = new CrudService();
var level = 1;

exports.signup = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;
    var fname = post.first_name;
    var lname = post.last_name;
    var mob = post.mob_no;

    var sql =
      "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" +
      fname +
      "','" +
      lname +
      "','" +
      mob +
      "','" +
      name +
      "','" +
      pass +
      "')";

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message = "Succesfully! Your account has been created.";
      res.render("signup.ejs", { message: message });
    });
  } else {
    res.render("signup");
  }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res) {
  var message = "";
  var sess = req.session;

  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;

    var sql =
      "SELECT * FROM `users` WHERE `user_name`='" +
      name +
      "' and password = '" +
      pass +
      "'";
    db.query(sql, function(err, results) {
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        level = results[0].access_level;
        console.log("User #" + results[0].id + ":" + level);
        res.redirect("/home/dashboard");
      } else {
        message = "Incorrect username and/or password.";
        res.render("index.ejs", { message: message });
      }
    });
  } else {
    res.render("index.ejs", { message: message });
  }
};
exports.managerLogin = function(req, res) {
  var message = "";
  var sess = req.session;

  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;

    var sql =
      "SELECT * FROM `users` WHERE `user_name`='" +
      name +
      "' and password = '" +
      pass +
      "'";
    db.query(sql, function(err, results) {
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        level = results[0].access_level;
        console.log("User #" + results[0].id + "::" + level);
        if (level <= 2) {
          console.log("Turkey");
          res.render("managerLogin.ejs");
        } else {
          res.redirect("/home/management");
        }
      } else {
        message = "Incorrect username and/or password.";
        res.render("managerLogin.ejs", { message: message });
      }
    });
  } else {
    res.render("managerLogin.ejs", { message: message });
  }
};

//-----------------------------------------------dashboard page functionality----------------------------------------------
exports.dashboard = function(req, res, next) {
  var user = req.session.user,
    userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

  db.query(sql, function(err, results) {
    res.render("dashboard.ejs", { data: results });
  });
};

//------------------------------------logout functionality----------------------------------------------
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/login");
  });
};

//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

  db.query(sql, function(err, result) {
    res.render("profile.ejs", { data: result });
  });
};

//---------------------------------edit users details after login----------------------------------
exports.editprofile = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
  db.query(sql, function(err, results) {
    res.render("edit_profile.ejs", { data: results });
  });
};

//---------------------------------Inventory----------------------------------
exports.inventory = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `vehicles`";
  db.query(sql, function(err, result) {
    res.render("inventory.ejs", { data: result });
  });
};

//---------------------------------Upload----------------------------------
exports.upload = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;

    var cols = ["vin", "year", "make", "model", "bodystyle", "color", "price"];
    var data = [
      post.vin,
      post.year,
      post.make,
      post.model,
      post.bodystyle,
      post.color,
      post.price
    ];

    sql = build.insertData("vehicles", cols, data);

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message =
        "Succesfully! You have uploaded a " +
        post.year +
        " " +
        post.make +
        " " +
        post.model +
        ".";
      res.render("upload.ejs", { message: message });
    });
  } else {
    res.render("upload");
  }
};

//---------------------------------Services----------------------------------
exports.services = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = build.readData("services", "*", null, false);
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("services.ejs", { data: result });
  });
};

//---------------------------------Schedule Service----------------------------------
exports.scheduleService = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var service = post.service;
    var date = post.date;

    var sql =
      "INSERT INTO `services`(`service`,`date`) VALUES ('" +
      service +
      "','" +
      date +
      "')";

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message =
        "Succesfully! You have scheduled a " + service + " on " + date + ".";
      res.render("scheduleService.ejs", { message: message });
    });
  } else {
    res.render("scheduleService");
  }
};

//---------------------------------Contact----------------------------------
exports.contact = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var fName = post.fName;
    var lName = post.lName;
    var mob_no = post.mob_no;
    var text = post.text;

    var sql =
      "INSERT INTO `contact`(`fName`,`lName`,`mob_no`,`text`) VALUES ('" +
      fName +
      "','" +
      lName +
      "','" +
      mob_no +
      "','" +
      text +
      "')";

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message = "Message sent to management!";
      res.render("contact.ejs", { data: result });
    });
  } else {
    res.render("contact");
  }
};

//--------------------------------Search--------------------------------
exports.search = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var bodystyle = post.bodystyle;
    var make = post.make;
    var color = post.color;
    var constraints = [post.make, post.bodystyle, post.color];

    if (constraints[0] != "") {
      constraints[0] = "make = '" + constraints[0] + "'";
    }
    if (constraints[1] != "") {
      if (constraints[0] != "") {
        constraints[0] += " AND ";
      }
      constraints[1] = "bodystyle = '" + constraints[1] + "'";
    }
    if (constraints[2] != "") {
      if (constraints[1] != "") {
        constraints[1] += " AND ";
      } else if (constraints[0] != "") {
        constraints[0] += " AND ";
      }
      constraints[2] = "color = '" + constraints[2] + "'";
    }

    var cols = ["*"];

    var sql = build.readData("vehicles", "*", constraints);
    console.log(sql);

    if (constraints[1] + constraints[2] + constraints[3] != "") {
      db.query(sql, function(err, result) {
        console.log(result);
        res.render("inventory.ejs", { data: result });
      });
    }
  }
};

//--------------------------------Management ACL--------------------------------
exports.management = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  if (level < 2) {
    res.redirect("/home/managerLogin");
    return;
  }

  var sql = build.readData("contact", "*", null, false);

  db.query(sql, function(err, result) {
    if (err) throw err;
    res.render("management.ejs", { data: result });
  });
};

//-----------------------------Delete Vehicle--------------------------------
exports.remove = function(req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/home/inventory");
    return;
  }
  if (req.method == "POST") {
    var vin = req.body.vin;
  }

  var sql = "DELETE FROM services WHERE vin = '" + vin + "'";
  db.query(sql, function(err, result) {
    res.render("inventory.ejs", { data: result });
  });
};
