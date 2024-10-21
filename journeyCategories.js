const express = require("express");
const CategoryModel = require("./CategoryModel");
const categories = express.Router();


categories.get("./categories", async (req,res) => {

    try {
        const categories = await CategoryModel.find();
        if(categories.length === 0) {
            res.status(404).send({statusCode:404, message:"No categories found"})
        }
        res.status(200).send({statusCode: 200, message:`${categories.length} categories found`}, categories)

        
    } catch (error) {
        res.status(500).send({
            message: error.message,
          });
    }
})


categories.get("./categories/byId/:categoryId", async(req,res) => {
    const {categoryId} = req.params;
    try {
        const category = await CategoryModel.findById(categoryId);
        if(!category) {
            res.status(404).send({statusCode:404, message: "No category found with the given Id"})

        }
        res.status(200).send({statusCode:200, message:"Category found successfully", category})

    } catch (error) {
        res.status(500).send({
            message: error.message,
          });
    }
})


categories.post("./categories/create", async(req,res) => {

   
    try {
        const {name, description, images} = req.body;
        const newCategory = new CategoryModel({
            name: name,
            description: description,
            images: images;

        })
        
        const savedCategory = await newCategory.save();
        res.status(201).send({statusCode:201, message:"Categorycreated successfully"}, savedCategory)


    } catch (error) {
        res.status(500).send({ message: "Errore nella creazione della categoria", error: error.message });
    }
})


categories.patch("./categories/update/:categoryId", async (req,res) => {
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
        res.status(500).send({
            statusCode: 500,
            message: error.message,
          });
    }
})


categories.delete(":/categories/delete/:categoryId", async (req,res) => {
    const {categoryId} = req.params;

    try {
       await CategoryModel.findByIdAndDelete(categoryId);
       res.status(200).send({statusCode: 200, message: "Category deleted successfully"}, categoryId)



    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: error.message,
          });
        
    }
})
