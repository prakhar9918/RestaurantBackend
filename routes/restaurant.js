const express = require('express');
const {createRestaurant,getAllRestaurant,getRestaurant}= require('../controllers/restaurantController');

const router = express.Router();

router.post('/createRestaurant', createRestaurant);
router.get('getAllRestaurant', getAllRestaurant);
router.get('/show', getRestaurant);

module.exports = router;