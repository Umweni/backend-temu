const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId:{
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
        required: false
    },
    discount_price:{
        type: Number,
        required: false
    },
    discounted_total:{
        type: Number,
        required: false
    },
    total_product:{
        type: Number,
        required: true
    },
    total_quantity:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
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