let express = require("express");
let app = express();
let mongoose = require("mongoose");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/imagesharer");

app.get("/", (req,res)=>{

    res.status(200).json({message: "Ok"});
});

module.exports = app;