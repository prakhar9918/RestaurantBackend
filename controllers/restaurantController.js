const Restaurant = require("../models/restaurantSchema");

const createRestaurant = async (req, res) => {
    try {
        let { title, imageUrl, food, time, pickup, delivery, isopen, logoUrl, rating, ratingCount, code, coords } = req.body;
        // if (!title || !imageUrl || !food || !time || !pickup || !delivery || !isopen || !logoUrl || !rating || !ratingCount || !code || !coords) {
        //    return res.status(400).send({
        //         success: false,
        //         message: "Missing required fields"
        //     });
        // }
        let newRestaurant = new Restaurant({
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isopen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });
        await newRestaurant.save();
        res.status(200).send({
            success: true,
            message: "Restaurant added successfully",
            newRestaurant
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Restaurant didn't register",
            error: error.message
        });    }
};

const getAllRestaurant = async (req, res) => {
    try {
        const allRestaurant = await Restaurant.find();
        if (!allRestaurant || allRestaurant.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No restaurants are registered",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: allRestaurant.length,
            message: "Restaurants are showing",
            allRestaurant
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Restaurants can't be fetched",
            error: err.message
        })
    }
}

const getRestaurant = async (req, res) => {
    try {
        let { id } = req.params;
        const singleRestaurant = await Restaurant.findById(id);
        if (!singleRestaurant) {
            return res.status(404).send({
                success: false,
                message: "No restaurant is registered with this ID",
            });
        }
        res.status(200).send({
            success: true,
            message: "Restaurant is showing",
            singleRestaurant
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Restaurant can't be fetched",
            error: err.message
        })
    }
}

module.exports = { createRestaurant, getAllRestaurant, getRestaurant };