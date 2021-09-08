//import express module
const express = require("express");

// instantiate an application server
const app = express();

// add support to parsing json in the body
app.use(express.json());

app.use(express.static("./public"));

const items = require("./items/routes");
app.use(items);

const users = require("./items/routes");
app.use(users);

// define port this app listens on
const PORT = 4000;

//returns some banner info for a sanity check
app.get("/", function(req, res){
    res.send("Here lies my sanity check for the root of the server - Best todo App");
})

// start application
app.listen(PORT, function(){
    console.log("App started, listening on port", PORT);
})