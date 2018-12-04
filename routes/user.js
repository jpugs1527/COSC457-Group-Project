exports.signup = function(req, res) {
  message = "";
  if (req.method == "POST") {
    //post data
  } else {
    res.render("signup");
  }
};

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
        console.log(results[0].id);
        req.session.userId = results[0].id;
        req.session.user = results[0];

        res.redirect("/home/dashboard");
      } else {
        message = "Wrong Credentials.";
        res.render("index.ejs", { message: message });
      }
    });
  } else {
    res.render("index.ejs", { message: message });
  }
};

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
      message = "Succesfully! Your account has been created.";
      res.render("signup.ejs", { message: message });
    });
  } else {
    res.render("signup");
  }
};

exports.dashboard = function(req, res, next) {
  var user = req.session.user,
    userId = req.session.userId;

  if (userId == null) {
    res.redirect("/home/login");
    return;
  }

  var sql = "SELECT * FROM `login_details` WHERE `id`='" + userId + "'";

  db.query(sql, function(err, results) {
    console.log(results);

    res.render("profile.ejs", { user: user });
  });
};
