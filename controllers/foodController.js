const Food = require('../models/foodSchema');
const Order = require('../models/orderSchema');

const createFood = async(req,res)=>{
    try{
    let {title,description,imageUrl,price,foodtag,code,category,isAvailable,restaurant,rating,ratingCount} = req.body;
    if(!title||!description||!price){
        return res.status(404).send({
            success:false,
            message:"Please enter required fields"
        })
    }
    let newFood = new Food({
        title,
        description,
        imageUrl,
        price,
        foodtag,
        code,
        category,
        isAvailable,
        restaurant,
        rating,
        ratingCount
    });
    await newFood.save();
    res.status(200).send({
        success:true,
        message:"food created successfully",
        newFood
    })
    }catch(error){
    res.status(400).send({
        success:false,
        message:"Food didn't created",
        error
    })
}
}

const getAllFood = async(req,res)=> {
    try{
        let allFood = await Food.find();
        if(!allFood){
            return res.status(404).send({
                success:false,
                message:"Foods are not available",
            })
        }
        res.status(200).send({
            status:true,
            totalFoods:allFood.length,
            allFood
        })
    }catch(err){
        res.status(200).send({
            success:false,
            message:"Unable to fetch all Food",
            err
        })
    }
}
const getFood = async(req,res)=> {
    try{
        let{id} = req.params;
        let singleFood = await Food.findById(id).populate({path:'category',select:'title'});
        if(!singleFood){
            return res.status(404).send({
                success:false,
                message:"Food are not available",
            })
        }
        res.status(200).send({
            status:true,
            singleFood
        })
    }catch(err){
        res.status(200).send({
            success:false,
            message:"Unable to fetch Food",
            err
        })
    }
}

const updateFood = async(req,res) =>{
    try{
     let{id} = req.params;
     let{title,description,imageUrl,price,foodtag,code,category,isAvailable,restaurant,rating,ratingCount} = req.body;
     let updatedFood = await Food.findByIdAndUpdate(id,{title,description,imageUrl,price,foodtag,code,category,isAvailable,restaurant,rating,ratingCount},{new:true});
     if(!updatedFood){
        return res.status(404).send({
            success:false,
            message:"Nothing is updated"
        })
     }
     res.status(200).send({
        success:true,
        message:"Updation successfull",
        updatedFood
     })
    }catch(error){
        res.status(200).send({
            success:false,
            message:"Updation unsuccessfull",
            err
         })
    }
}

const deleteFood = async(req,res) =>{
    try{
     let{id} = req.params;
     let deletedFood = await Food.findByIdAndDelete(id);
     if(!deletedFood){
        return res.status(404).send({
            success:false,
            message:"Nothing is deleted"
        })
     }
     res.status(200).send({
        success:true,
        message:"deletion successfull",
        deleteFood
     })
    }catch(error){
        res.status(200).send({
            success:false,
            message:"deletion unsuccessfull",
            err
         })
    }
}

const getfoodByRestaurant = async(req,res) =>{
    try{
      let {id} = req.params;
      let food = await Food.findById({restaurant:id});
      if(!food){
        return res.status(404).send({
            success:false,
            message:"This food is not available in this Restaurant"
        })
      }
      res.status(200).send({
        success:true,
        message:"Food is available",
        food
      })
    }catch(err){
        res.status(500).send({
          success:false,
          message:"Unable to fetch food from Restaurant",
          err
        })
    }
}

const placeorder = async(req,res) =>{
    try{
     const {cart,payment} = req.body;
     if(!cart || !payment){
        return res.status(404).send({
            success:false,
            message:"Please add cart and payment method"
        })
     }
     let total = 0;
     cart.map((i) => total += i.price);
     const newOrder =  new Order({
        food:cart,
        payment:payment,
     })

     await newOrder.save();

     res.status(200).send({
        success:true,
        message:"Order Placed",
        newOrder
     })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Unable to place Order",
            err
        })
    }
}

module.exports={createFood,getAllFood,getFood,updateFood,deleteFood,getfoodByRestaurant,placeorder};