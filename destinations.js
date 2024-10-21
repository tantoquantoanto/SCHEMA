const express = require("express");
const DestinationModel = require("./DestinationModel")
const destinations = express.Router();



destinations.get("./destinations", async (req, res) => {
    try {
        const destinations = await DestinationModel.find();
        if(destinations.length === 0) {
            res.status(404).send({statusCode: 404, message: "No destinations found"})
        }

        res.status(200).send({statusCode: 200, message: `You found ${destinatiions.length} destinations`, destinations});




        
    } catch (error) {
        res.status(500).send({
            message: error.message,
          });
    }


})


destinations.get("./destinations/byid/:destinationId", async (req,res) => {
  const {destinationId} = req.params;
  try {
    const destination = await DestinationModel.findById(destinationId)
    if(!destination) {
        res.status(404).send({statusCode: 404, message: "No destination found with the given id"})
    }
    res.status(200).send({statusCode: 200, message:"Destination found successfully", destination})


  } catch (error) {
    res.status(500).send({statusCode:500, message: error.message})
  }

})


destinations.post("/destinations/create", async (req, res) => {
    try {
        const { name, description, location, category, images } = req.body;
        const newDestination = new DestinationModel({
            name: name,
            description: description,
            location: location,
            category: category, // Dovrebbe essere l'ObjectId della categoria
            images: images 
        });

        const savedDestination = await newDestination.save();

 
        res.status(201).send(savedDestination);

    } catch (error) {
        
        res.status(500).send({ message: "Errore nella creazione della destinazione", error: error.message });
    }
});


destinations.patch("./destinations/update/:destinationId", async (req,res) => {
    const {destinationId} = req.params;
    try {

        const updatedData = req.body;
        const options = {new: true};

        const result = await DestinationModel.findByIdAndUpdate(
            destinationId, 
            updatedData, 
            options

        )

        res.status(200).send({statusCode: 200, message: "Destination updated successfully"}, result)


        
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: error.message,
          });
        
    }
})


destinations.delete(":/destinations/delete/:destinationId", async (req,res) => {
    const {destinationId} = req.params;

    try {
       await DestinationModel.findByIdAndDelete(destinationId);
       res.status(200).send({statusCode: 200, message: "Destination deleted successfully"}, destinationId)



    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: error.message,
          });
        
    }
})


module.exports = destinations;