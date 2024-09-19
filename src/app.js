let express = require("express");
let app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req,res)=>{

    res.status(200).json({message: "Ok"});
});

module.exports = app;