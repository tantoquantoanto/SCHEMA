const express = require("express");
const ReviewsModel = require("./ReviewsModel");
const reviews = express.Router();



reviews.get("./reviews", async(req,res) => {
    try {
        const reviews = await ReviewsModel.find();
        if(reviews.length === 0){
            res.status(404).send({statusCode:404, message:"No reviews found"})
        }

        res.status(200).send({statusCode:200, message:`${reviews.length} reviews found successfully`}, reviews)
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
          });
        
    }
})

reviews.get("./reviews/byId/:reviewId", async(req,res) => {
    const {reviewId} = req.params;
    try {

        const review = await ReviewsModel.findById(reviewId);
        if(!review) {
            res.status(404).send({statusCode: 404, message:"No reviews found with the given id"})
        }

        res.status(200).send({statusCode:200, message:"Review found successfully", review})
        
    } catch (error) {
        res.status(500).send({statusCode:500, message: error.message})
    }
})


reviews.post("./reviews/create", async(req,res) => {
try {
    const {user, destination, rating, comment} = req.body;

    const newReview = new ReviewsModel({
        user: user,  // DOVREBBE ESSERE L'OBJECTID DELL'UTENTE
        destination: destination,// DOVREBBE ESSERE L'OBJECTID DELLA DESTINAZIONE
        rating: rating, 
        comment: comment
    })

    const savedReview = await newReview.save();

    res.status(201).send({statusCode:201, message: "Review created successfully", savedReview})
    
} catch (error) {
    res.status(500).send({ message: "Errore nella creazione della recensione", error: error.message });
}


})


reviews.patch("./reviews/update/:reviewId", async(req,res) => {
    const{reviewId} = req.params; 

    try {
        const updatedData = req.body; 
        const options = {new:true};

        const result = await ReviewsModel.findByIdandUpdate({
            reviewId, 
            updatedData, 
            options
        })
        
    } catch (error) {
        
    }
})

//uando invii la richiesta dal frontend per creare una recensione, dovresti inviare un oggetto JSON simile a questo:

//{
  "user": "652e6a6bcd42c22df67b1234", // ObjectId dell'utente
  "destination": "652e6a6bcd42c22df67b5678", // ObjectId della destinazione
  "rating": 5,
  "comment": "Posto fantastico, ci tornerò sicuramente!"}