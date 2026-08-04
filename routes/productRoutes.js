const express = require("express");
const router = express.Router();
const Product = require("../model/product"); 
const Cart = require("../model/cart");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");



// Configure multer to store files temporarily in "uploads" folder
const upload = multer({ dest: "uploads/" });



// get all products
router.get("/fetch-all", async (req, res) => {
    try {
        const product = await product.find().sort({ createdAt: -1 });
        return res.status(200).send({status: "ok", msg: "success", data: product});
    }
    catch(err) {
        console.error(err);
        return res.status(500).send({status: "error", msg: "Internal server error"});
    }
});

// create a new product
router.post("/add-product", upload.single("image"), async (req, res) => {
    
        const { title, price, quantity, total, discount_percentage, discount_price, discounted_total, total_product, total_quantity, rating, image, image_id } = req.body;
        if ( !title || !price || !quantity  || !rating) {
            return res.status(400).send({status: "error", msg: "Missing required fields"});
        }
        
          // Check if image was uploaded
  if (!req.file) {
    return res.status(400).send({ status: 'error', msg: 'product image is required' });
  }

   try {
    // 1. Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products',
    });

    // 2. Create product in database
    const product = await Product.create({
      title,
      quantity,
      total_quantity,
      total_product,
      total,
      discount_price,
      discount_percentage,
      discounted_total,
      price,
      rating,
      image: result.secure_url, // Save the Cloudinary URL
      image_id: result.public_id // Save the Cloudinary ID for later deletion
    });

    return res.status(201).send({ status: 'ok', msg: 'success', data: product });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ status: 'error', msg: 'some error occurred', error: e.message });
  }
});

module.exports = router;