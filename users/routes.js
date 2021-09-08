const express = require('express');

const router = express.Router();

router.get("/users", function(req, res){
    res.json("user list goes here");
});

router.get("/users/:id", function(req, res){
    res.json("user specific info goes here");
});

router.put("/users/:id", function(req, res){
    res.json("update user and return here");
});