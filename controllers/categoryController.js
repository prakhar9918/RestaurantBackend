const Category = require('../models/categorySchema');

const createCategory = async(req,res)=>{
    try{
    let {title,imageUrl} = req.body;
    if(!title){
        return res.status(404).send({
            success:false,
            message:"Please enter required fields"
        })
    }
    let newCategory = new Category({
        title,
        imageUrl
    });
    await newCategory.save();
    res.status(200).send({
        success:true,
        message:"Category created successfully",
        newCategory
    })
    }catch(error){
    res.status(400).send({
        success:false,
        message:"Category didn't registered",
        error
    })
}
}

const getAllCategory = async(req,res)=> {
    try{
        let allCategory = await Category.find();
        if(!allCategory){
            return res.status(404).send({
                success:false,
                message:" Categories are not available",
            })
        }
        res.status(200).send({
            status:true,
            totalCategories:allCategory.length,
            allCategory
        })
    }catch(err){
        res.status(200).send({
            success:false,
            message:"Unable to fetch all Categories",
            err
        })
    }
}

const updateCategory = async(req,res) =>{
    try{
     let{id} = req.params;
     let{title,imageUrl} = req.body;
     let updatedCategory = await Category.findByIdAndUpdate(id,{title,imageUrl},{new:true});
     if(!updatedCategory){
        return res.status(404).send({
            success:false,
            message:"Nothing is updated"
        })
     }
     res.status(200).send({
        success:true,
        message:"Updation successfull"
     })
    }catch(error){
        res.status(200).send({
            success:false,
            message:"Updation unsuccessfull",
            err
         })
    }
}

const deleteCategory = async(req,res) =>{
    try{
     let{id} = req.params;
     let deletedCategory = await Category.findByIdAndDelete(id);
     if(!deletedCategory){
        return res.status(404).send({
            success:false,
            message:"Nothing is deleted"
        })
     }
     res.status(200).send({
        success:true,
        message:"deletion successfull"
     })
    }catch(error){
        res.status(200).send({
            success:false,
            message:"deletion unsuccessfull",
            err
         })
    }
}

module.exports = {createCategory,getAllCategory,updateCategory,deleteCategory};