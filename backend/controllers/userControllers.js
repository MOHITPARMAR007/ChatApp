const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require('../config/genrateToken');

const authUser= asyncHandler(async (req,res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
})

const allUsers = asyncHandler(async (req,res)=>
{
    const keyword = req.query.search
    ? {
        $or: [
            // $regex is a mongo db quries 
          { name: { $regex: req.query.search, $options: "i" } }, //case insensitive
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    // all users except the user who is logged in 
    const users = await User.find(keyword).find({_id: {$ne : req.user._id}})
    res.send(users);
})

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: "Please enter all the fields" });
        return;
    }

    try {
        const userExists = await User.findOne({ email }) 


        if (userExists) {
            res.status(400).json({ error: "User already exists" });
           
        }

        const user = await User.create({
            name,
            email,
            password,
            pic,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ error: "User registration failed" });
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

    }
});
 

module.exports = { registerUser , authUser, allUsers};
