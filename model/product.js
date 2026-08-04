const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true 
    },
    quantity:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    discount_percentage:{
        type: Number,
        required: true
    },
    discount_price:{
        type: Number,
        required: false
    },
    discounted_total:{
        type: Number,
        required: true
    },
    total_product:{
        type: Number,
        required: false
    },
    total_quantity:{
        type: Number,
        required: false
    },
    rating:{
        type: Number,
        required: false
    },
    image:{
        type: String,
        required: true
    },
    image_id:{
        type: String,
        required: true
    },



},{timestamps: true});

module.exports = mongoose.model("Product", productSchema);