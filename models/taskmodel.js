const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    text:String,
    dayTime:String,
    reminder:Boolean
})
const taskModel=mongoose.model("Task",taskSchema,"Task");
module.exports=taskModel;