//---------------------------------------------signup page call------------------------------------------------------
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
      "SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='" +
      name +
      "' and password = '" +
      pass +
      "'";
    db.query(sql, function(err, results) {
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        console.log("User #" + results[0].id);
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

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
  db.query(sql, function(err, result) {
    res.render("inventory.ejs", { data: result });
  });
};

//---------------------------------Upload----------------------------------
exports.upload = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var vin = post.vin;
    var year = post.year
    var make = post.make;
    var model = post.model;
    var bodystyle = post.bodystyle;
    var color = post.color;
    var price = post.price;

    var sql =
      "INSERT INTO `vehicles`(`vin`,`year`,`make`,`model`,`bodystyle`,`color`,`price`) VALUES ('" +
      vin +
      "','" +
      year +
      "','" +
      make +
      "','" +
      model +
      "','" +
      bodystyle +
      "','" +
      color +
      "','" +
      price +
      "')";

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message = "Succesfully! You have uploaded a " + year + " " + make + " " + model + ".";
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

  var sql = "SELECT * FROM `services`";

  db.query(sql, function(err, result) {
    res.render("services.ejs", { data: result });
  });
};

//---------------------------------Schedule Service----------------------------------
exports.scheduleService = function(req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var service = post.service;
    var date = post.date

    var sql =
      "INSERT INTO `services`(`service`,`date`) VALUES ('" +
      service +
      "','" +
      date +
      "')";

    var query = db.query(sql, function(err, result) {
      if (err) throw err;
      message = "Succesfully! You have scheduled a " + service + " on " + date + ".";
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
      res.render("contact.ejs", { message: message });
    });
  } else {
    res.render("contact");
  }
};