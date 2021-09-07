//import express module
const express = require("express");

// instantiate an application server
const app = express();

// add support to parsing json in the body
app.use(express.json());

// define port this app listens on
const PORT = 4000;

let nextId = 3;

let db = [{
    "id": 1,
    "label": "Call ya momma",
    "dueDate": "yesterday",
    "done": false,
    "priority": "high"
},{
    "id": 2,
    "label": "buy vodka",
    "dueDate": "yesterday",
    "done": false,
    "priority": "high"
}]


/***
 *  GET /items
 * GET /items/:id
 * POST /items      body{}
 * PUT /items/:id   body{}
 * DELETE /items/:id
 */

//returns some banner info for a sanity check
app.get("/", function(req, res){
    res.send("Here lies my sanity check for the root of the server - Best todo App");
})

// GET /items
//return basic info for all the items
app.get("/items", function(req, res){
    console.log("GET /items");
  
    let simplifiedDb = db.map(function(item, index){
        // use map() higher order to convert every item in arr to simpler copy
        // that only has id, label, and doneStatus
        return ({"id": item.id, "label": item.label, "done": item.done});
    })
    res.json(simplifiedDb);
})

// GET /item/:id
// return entire item matching id
app.get("/items/:id", function(req, res){
    console.log("GET /items/:id", req.params);
    // want to get one of the objects from array return it
    let theID = req.params.id;
    console.log(theID);
    let found = null;
    found = db.find(item => item.id == theID);
    console.log(found);
    res.json(found);
})

//POST /items    body{label required, extra attributes stored with item}
//add new item to list
// provide info about the item you wanna add
app.post("/items", function(req, res){
    console.log("POST /items", req, body);

    let dataIn = req.body;
    let newID; // need to find a way to come up with a new ID
    nextId++;

    // if they sent an id - override it
    dataIn.id = newID;

    //this checks iflabel was provided
    if(!dataIn.label){
        //this code will execute if label is falsey
        // have to decide what to do
        res.statusCode(400);
        return
    }

    // if they send anything other than true for done flag
    // we mark item as not done
    if(dataIn.done != true) {
        dataIn.done = false;
    }

    db.push(dataIn);
    res.sendStatus(204);
})

// PUT items/:id body{}
// updat item with new info
// body is the info you want to update item with
app.put("/items/:id", function(req, res){

})

//if id is included in body, 
// replace it with the id that is passed in on the path param

// PUT /items
// make sure the id and the info you want to update the itme with are both in body

//DELETE
app.delete("/items/:id", function(req, res){
    
})

// start application
app.listen(PORT, function(){
    console.log("App started, listening on port", PORT);
})