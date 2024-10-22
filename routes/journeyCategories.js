const express = require("express");
const CategoryModel = require("../CategoryModel");
const categories = express.Router();


categories.get("./categories", async (req,res, next) => {
    const {page = 1, pageSize = 4} = req.query; 
    

    try {
        const totalCategories = await CategoryModel.countDocuments();
        const totalPages = Math.ceil(totalCategories/pageSize);

        const categories = await CategoryModel.find()
        .limit(pageSize)
        .skip((page-1) * pageSize);

        if(categories.length === 0) {
            res.status(404).send({statusCode:404, message:"No categories found"})
        }
        res.status(200).send({statusCode: 200, message:`${categories.length} categories found`}, 
            totalCategories = totalCategories,
            totalPages= totalPages,
            categories)

        
    } catch (error) {
       next(error)
    }
})


categories.get("./categories/byId/:categoryId", async(req,res, next) => {
    const {categoryId} = req.params;
    try {
        const category = await CategoryModel.findById(categoryId);
        if(!category) {
            res.status(404).send({statusCode:404, message: "No category found with the given Id"})

        }
        res.status(200).send({statusCode:200, message:"Category found successfully", category})

    } catch (error) {
        next(error)
    }
})


categories.post("./categories/create", async(req,res, next) => {

   
    try {
        const {name, description, images} = req.body;
        const newCategory = new CategoryModel({
            name: name,
            description: description,
            images: images

        })
        
        const savedCategory = await newCategory.save();
        res.status(201).send({statusCode:201, message:"Categorycreated successfully"}, savedCategory)


    } catch (error) {
        next(error)
    }
})


categories.patch("./categories/update/:categoryId", async (req,res, next) => {
    const {categoryId} = req.params;
    try {
        const updatedData = req.body;
        const options = {new: true};

        const result = await CategoryModel.findByIdAndUpdate({
            categoryId,
            updatedData,
            options
        })

        res.status(200).send({statusCode:200, message:"Category updated successfully", result})

        
    } catch (error) {
        next(error)
    }
})


categories.delete(":/categories/delete/:categoryId", async (req,res, next) => {
    const {categoryId} = req.params;

    try {
       await CategoryModel.findByIdAndDelete(categoryId);
       res.status(200).send({statusCode: 200, message: "Category deleted successfully"}, categoryId)



    } catch (error) {
       next(error)
        
    }
})

module.exports = categories;