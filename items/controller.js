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

let nextId = 3;

let getAllItems = function(req, res){
    console.log("GET /items");
  
    let simplifiedDb = db.map(function(item, index){
        // use map() higher order to convert every item in arr to simpler copy
        // that only has id, label, and doneStatus
        return ({"id": item.id, "label": item.label, "done": item.done});
    })
    res.json(simplifiedDb);
};

let getItemById = function(req, res){
    console.log("GET /items/:id", req.params);
    // want to get one of the objects from array return it
    let theID = req.params.id;
    let found = null;
    found = db.find(item => item.id == theID);
    console.log(found);
    res.json(found);
};

let createAnItem = function(req, res){
    console.log("POST /items", req.body);

    let dataIn = req.body;
    let newID = nextId;
    nextId++;

    // if they sent an id - override it
    dataIn.id = newID;

    //this checks if label was provided
    if(!dataIn.label){
        //this code will execute if label is falsey
        // have to decide what to do
        res.statusCode(400).send("label required");
        return
    }

    // if they send anything other than true for done flag
    // we mark item as not done
    if(dataIn.done != true) {
        dataIn.done = false;
    }

    db.push(dataIn);
    res.sendStatus(204);
};

let editItem = function(req, res){
    console.log("PUT /items/:id", req.params);

    let dataIn = req.body;

    //override their id with our correct one if they entered an id for the item
    dataIn.id = req.params.id;

    // if they send anything other than true for done flag
    // we mark item as not done
    if(dataIn.done != true) {
        dataIn.done = false;
    }

    // reset all values of edited object
    db[dataIn.id].label = dataIn.label;
    db[dataIn.id].done = dataIn.done;
    db[dataIn.id].dueDate = dataIn.dueDate;
    db[dataIn.id].priority = dataIn.priority;

    res.sendStatus(204);
};

let deleteItemById = function(req, res){
    let id = req.params.id;

    let found = null;
    found = db.find(item => item.id == id);
    let delIndex = db.indexOf(found);
    // remove from the index we found the number from the search url params
    db.splice(delIndex, 1);
    res.sendStatus(204);
};

module.exports = {
    getAllItems,
    getItemById,
    deleteItemById,
    editItem, 
    createAnItem
}