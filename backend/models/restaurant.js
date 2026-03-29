const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter restaurant name"],
        trim: true,
        maxLength: [100, "Restaurant name cannot exceed 100 characters"],
        minLength: [3, "Restaurant name must be at least 3 characters"],
    },
    isVeg: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: [true, "Please enter restaurant address"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reviews: [
        {
            name:{
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        }
    ],
    images:[
        {
            public_idx:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            },

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ address: "text" });

module.exports = mongoose.model("Restaurant", restaurantSchema)