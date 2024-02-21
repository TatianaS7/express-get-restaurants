const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 

//Get All Restaurants
app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
});

//Get Restaurant (By Id)
app.get("/restaurants/:id", async (req, res) => {
    const num = req.params.id;
    const selectRestaurant = await Restaurant.findByPk(num);
    res.json(selectRestaurant);
});

//Add New Restaurant
app.post('/restaurants', async (req, res) => {
    try {
    const newRestaurant = await Restaurant.create(req.body);
    res.send(newRestaurant);

    res.status(201).json({ message: 'Restaurant Added!'});
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
});

//Update a Restaurant
app.put('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        await restaurant.update(req.body);
        res.json(restaurant);
    } catch(error){
        console.error('Error updating restaurant', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
});

//Delete Restaurant
app.delete('/restaurants/:id', async (req, res) => {
    try {
        await Restaurant.destroy({ where: { id: req.params.id }});

        res.status(200).json({ message: 'Restaurant Deleted'});
    } catch(error) {
        console.error('Error deleting restaurant', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
});




module.exports = app;