const express = require("express"); //importing express
const app = express();
const port = process.env.PORT || 3000; // declaring server
const useRouter = require("./routes"); // importing routes from figgerent file // importing functions from different file
const flash = require("connect-flash"); // flash is used to display messages dynamically as he submits the form it won't work without session module
const cookieParser = require("cookie-parser"); // this module is used to create session id which will be unique and it'll be valid unless page is reloaded/refreshed
const session = require("express-session");

let isAdmin; //this variable is used to validate and access routes
app.use(express.json()); // this will parse the JSON format

// using middleware to validate if the user is admin.
app.use("/admin/", (req, res, next) => {
  if (isAdmin) {
    next();
  } else {
    res.status(401).send("You are UnAuthorised");
  }
});

app.use(flash());
app.use(useRouter);
app.use(express.urlencoded({ extended: true }));

//this will create session id and stores in SeSecrectStringForSession
app.use(cookieParser("SecrectStringForSession"));
app.use(
  session({
    secret: "SecrectStringForSession",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  })
);

//for this page i've used ejs template engine so setting it to ejs
//if we want to use REACT we should import react and set view engine to react
app.set("view engine", "ejs");

// creating get request
app.get("/", (req, res) => {
  const getdata = req.flash("user")[0]; //getdata initially will be undefined & later it will get admin as true when button is clicked
  getdata === undefined ? (isAdmin = false) : (isAdmin = getdata);
  res.render("base", { isAdmin });
});

//this post request gets data from form and redirects to get page so user can access the page

app.post("/", (req, res) => {
  req.flash("user", req.body.isAdmin);
  res.redirect("/");
});

//this sends 404 error pic for every other routes which we've not declared
app.get("*", (req, res) => {
  res.status(404).sendfile(`./src/404img.jpg`);
});

//this will listen to port for changes
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
