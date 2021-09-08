const express = require('express');

const router = express.Router();

const cont = require("./controller");

/***
 *  GET /items
 * GET /items/:id
 * POST /items      body{}
 * PUT /items/:id   body{}
 * DELETE /items/:id
 */

// GET /items
//return basic info for all the items
router.get("/items", cont.getAllItems);

// GET /item/:id
// return entire item matching id
router.get("/items/:id", cont.getItemById);

//POST /items    body{label required, extra attributes stored with item}
//add new item to list
// provide info about the item you wanna add
router.post("/items", cont.createAnItem);

// PUT items/:id body{}
// update item with new info
// body is the info you want to update item with
//if id is included in body, 
// replace it with the id that is passed in on the path param
// PUT /items
// make sure the id and the info you want to update the item with are both in body
router.put("/items/:id", cont.editItem);

//DELETE
router.delete("/items/:id", cont.deleteItemById);

module.exports = router;