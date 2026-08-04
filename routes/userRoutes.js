const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt")

//create user

router.post("/create-user", async(req, res) => {
    const{ fullname, email, password, role} = req.body;

    if (!fullname || !email || !password || !role){
        return res.status(400).send({status:"error", msg: "required field must be filled"});
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        return res.status(200).send({status:"ok", msg: "success", data: user});
    } catch (error) {
        return res.status(500).send({status:"Error", msg: "some error occurred", error: "erorr.message"});
    }
});

module.exports = router;