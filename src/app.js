let express = require("express");
let app = express();
let mongoose = require("mongoose");
let user = require("../models/User");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/imagesharer").catch(err => console.error(err));

let User = mongoose.model("User",user);

app.get("/", (req,res)=>{

    res.status(200).json({message: "Ok"});
});

app.post("/user", async (req,res) => {

    try {
        let newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password});
        await newUser.save();
        res.status(200).json({email: req.body.email});
    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

module.exports = app;