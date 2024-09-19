let express = require("express");
let app = express();
let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
let user = require("../models/User");
let jwt = require("jsonwebtoken");

let JWTSecret = "jdasklçdjaklsçjdaklsjdpioasaspaskldjalskjdasklçfhjasdkljfklasçjhfkldçashjfkl1233434jkldjf";

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/{Your mongoDB Database}").catch(err => console.error(err));

let User = mongoose.model("User",user);

app.get("/", (req,res)=>{

    res.status(200).json({message: "Ok"});
});

app.post("/user", async (req,res) => {

    let {name, email, password} = req.body;

    if(name == "" || email == "" || password == ""){
        res.status(400).json({err: "Please fill all fields"});
        return;
    }
    

    try {
        let user = await User.findOne({"email": req.body.email});

        if(user != undefined){
            res.status(400).json({err: "Email already registered"});
            return;
        }

        let hash = bcrypt.hashSync(password, 10);

        let newUser = new User({name: name, email: email, password: hash});
        await newUser.save();
        res.status(200).json({email: req.body.email});
    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

app.post("/auth", async (req,res) => {
    let {email, password} = req.body
    let user = await User.findOne({"email": email});

    if(user == undefined){
        res.status(400).json({err: "Email or Password Incorrect"});
        return;
    }

    let compareHash = bcrypt.compareSync(password, user.password);

    if(compareHash && email == user.email){
        jwt.sign({email,name: user.name,id: user._id},JWTSecret,{expiresIn: "48h"}, (err, token) => {
            if(err){
                res.status(500);
                console.log(err);
            }else{
                res.json({token});
            }
        });
    }else{
        res.status(400).json({err: "Email or Password Incorrect"});
    }
});

app.delete("/user/:email", async (req,res) => {
    await User.findOneAndDelete({"email": req.params.email});
    res.status(204);
});

module.exports = app;