const mongoose =require("mongoose")

const userSchema=mongoose.Schema({
    emailid:String,
    name:String,
    password:String,
});

const userModel = mongoose.model("user",userSchema,"user")
module.exports=userModel