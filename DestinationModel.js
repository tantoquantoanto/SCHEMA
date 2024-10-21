const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' 
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    images: [{
        type: String, 
        required: true
    }]
}, 
{ timestamps: true, strict: true });

module.exports = mongoose.model('Destination', DestinationSchema, 'destinations');
