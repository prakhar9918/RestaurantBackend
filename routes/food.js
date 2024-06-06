const express = require('express');
const { createFood, getAllFood, getFood, updateFood, deleteFood, getfoodByRestaurant, placeorder } = require('../controllers/foodController');

const router = express.Router();

router.post('/createfood',createFood );
router.get('/getallfood', getAllFood );
router.get('/getfood/:id', getFood );
router.get('/getfoodByRestaurant/:id', getfoodByRestaurant);
router.put('/updatefood/:id', updateFood );
router.delete('/deletefood/:id', deleteFood );
router.post('/placeorder' , placeorder );

module.exports = router;