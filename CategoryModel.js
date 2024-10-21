const mongoose = require("mongoose");

const CategoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String, 
        required: false
    }]
}, 
{ timestamps: true, strict: true });

module.exports = mongoose.model('Category', CategoryModel, 'categories');
