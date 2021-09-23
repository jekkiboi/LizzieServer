//Newimports
require("dotenv").config();
require('./models')
const express = require("express");
const rowdy = require("rowdy-logger");
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT || 4000;
const app = express();
const articlesController = require("./controllers/articlesController");

const rowdyResults = rowdy.begin(app);


//App Variables


////////////////Old imports////////////////
// require("dotenv").config();
// const db = require('./models')
// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// const port = process.env.PORT || 4000;
// const app = express();
// const articlesController = require("./controllers/articlesController");
// const rowdy = require("rowdy-logger");
// const rowdyResults = rowdy.begin(app);
///////////End Old Imports/////////////



// middleware
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = {
//     origin: 'https://wayfarer-clone.herokuapp.com',
//   }

// cors allows the express server to take reqs from react
app.use(cors());

// use json to parse the form data
app.use(express.json());
  
// authentication
app.use(session({ secret: process.env.SESSION_SECRET }));


// Sign Up a New User
app.post("/signup", (req, res) => {
    // 1. ✅ take in the username and password from the form
    console.log(req.body);
    // 2. ✅ Make a query to create a new User
    db.User.create(req.body, (err, createdUser) => {
      if (err) console.log(err);
      console.log(createdUser);
      // 3. ✅ Redirect to /login
      req.session.currentUser = createdUser;
      res.json({
          message: "Successfully signed up for an account."
      });
    });
  });

// Log the user in - track the user in a cookie on their browser
app.post("/login", (req, res) => {
    console.log(req.body);

// 1. ✅ Check if the user passed in exists
db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) return console.log(err);
    // If the username is not correct, send them to the /login page
    if (!foundUser) {
      return res.json({
          message: "Username is not found"
      });
    }
  // 2. ✅ Check if the password passed in matches the one on file,
    // if not send them to the /login page
    if (req.body.password !== foundUser.password) {
        return res.json({
            message: "Wrong password"
        });
    }
    // 3. ✅ Track the user in a cookie on their browser
    //- Adding a new property into our session object
    //- The session object will be accessible from any of my routes
    req.session.currentUser = foundUser;
    console.log(req.session);
    // After successfully logging in go the articles show
    res.json({
        message: "You are now logged in"
    });
  });
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// api routes
app.use("/api/articles", articlesController);


//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    rowdyResults.print();
});

