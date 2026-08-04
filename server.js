const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//connect database
const connectDB = async () =>{
    try{
 const conn = await mongoose.connect(process.env.MONGODB_URI)
 console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
console.error(`ERROR: ${err.message}`);
process.exit(1);
    }
}

connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// If you expect form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

//mount router
app.use("/api/create-user", require("./routes/userRoutes"))
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/add-cart", require("./routes/cartRoutes"));



const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;