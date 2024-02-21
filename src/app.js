const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants/:id", async (req, res) => {
    const num = req.params.id;
    const selectRestaurant = await Restaurant.findByPk(num);
    res.json(selectRestaurant);
})




module.exports = app;