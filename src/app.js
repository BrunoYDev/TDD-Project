let express = require("express");
let app = express();
let bcrypt = require("bcrypt");
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

module.exports = app;