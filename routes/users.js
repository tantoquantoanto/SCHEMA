const express = require("express");
const UsersModel = require("../Schemas/UsersModel");
const users = express.Router();


users.get("./users", async (req,res) => {
    try {
        const users = UsersModel.find()
        if(users.length === 0) {
            res.status(404).send({statusCode: 404, message: })
        }
        
    } catch (error) {
        
    }
})

module.exports = users;