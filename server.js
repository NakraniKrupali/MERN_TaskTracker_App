const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const port = 4000
app.use(express.json())
mongoose
.connect("mongodb://localhost:27017/mca")
.then(() => console.log("mongo db connected"))
// app.get('/', (req, res) => res.send('Hello World!'))

const taskModel=require("./models/taskmodel")
const userModel=require("./models/usermodel")
app.get('/', (req, res) => res.send('Hello Welcome to Task Tracker Application'))


//register user
app.post("/api/register",async(req,res)=>{
    const user=req.body
//     console.log(user)
   const newuser= await userModel.create(user)
   
   if(newuser !== null){
       return res.json({msg:"User Register Successfully",code:200})
   }
   return res.json({msg:"Failed  to Registeration",code:404})
})

//user login
app.post("/api/login",async(req,res)=>{
    const userData= await userModel.findOne({emailid:req.body.emailid,password:req.body.password})
    if(userData !== null){
        return res.json({msg:"Login Successfully",code:200,user:userData})
    }else{
        return res.json({msg:"Login Failed",code:404})
    }

})
//get all task
app.get("/api/list",async(req,res)=> {
    const taskList = await taskModel.find();

    // if(taskList.length === 0){
    //     return res.json({data : "no task  Perform"})
    // }
    return res.json({taskData:taskList})
});

 //add task api
app.post("/api/addtask",(req,res)=>{
    const newtask=req.body;
    console.log(newtask)
    taskModel.create(newtask);
    
    return res.json({msg:"Task Added Successfully",code:200});
}) 
// update all details of task
app.put("/api/updatetask",async(req,res)=>{
    const user= req.body
    const updatedUser= await taskModel.findOneAndUpdate(
        {_id:user.id},
        {   text:user.text,
            dayTime:user.dayTime,
            reminder:user.reminder
        },
        {new:true}
    )
    return res.json({msg:"Task Updated Successfullt",code:200,user:updatedUser})
})
//Update reminder of task
app.put("/api/updatetask/reminder",async(req,res)=>{
    const user=req.body
    const updatedUser= await taskModel.findOneAndUpdate(
        {_id:user._id},
        {reminder:user.reminder},
        {new:true}
       )
       return res.json({msg:"Reminder Updated Successfully",code:200,user:updatedUser})
})
//delete Task
app.post("/api/deleteTask",async(req,res)=>{
    const id=req.body._id;
    const deleteduser= await taskModel.findOneAndDelete({_id:id})
    return res.json({msg:"Task Deleted Successfully",code:200,user:deleteduser})
})
app.listen(port, () => console.log(`Task Tracker app listening on port ${port}!`))
