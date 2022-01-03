import './index.css';
import AddTask from './components/AddTask';
import  Update from './components/Update'
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import AccountLink from './components/AccountLink';
import Register from './components/Register';
import axios from 'axios';
import {useState,useEffect} from 'react'
import Tasks from './components/Tasks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import{login,logout} from './Action'
function App() {

  const isLogged =useSelector((state)=>state);
  const dispatch=useDispatch()
  const [tasks,setTask]=useState([]);
  const [showAddTask,setShowAddTask]=useState(false);
  const settaskdata = ()=>{
    axios.get("/api/list").then((res)=>{
          //console.log(res.data)
         setTask(res.data.taskData);
        });
    }
    useEffect(()=>{
      axios.get("/api/list").then((res)=>{
      // console.log(res.data)
        setTask(res.data.taskData);
      });
      
  })
  const deleteTask = (taskid)=>{
        axios.post("/api/deleteTask",{_id:taskid}).then(res=>{
          if(res.data.code=== 200){
            settaskdata()
          }
          else{
            alert("Cant Delete this Record")
          }
        })
  }
  const toggleReminder = (taskid,reminder) =>{
        axios.put("/api/updatetask/reminder",{_id:taskid,reminder:reminder})
        .then((res)=>{
         // console.log(res.data.user)
          settaskdata()
        })
  }
  //add task
  const addTask=(task)=>{
      axios.post("/api/addtask",task).then((res)=>{
        const data=res.data;
        if(data.code === 200){
          //settaskdata()
          console.log("adding task successfully")
        }else{
          console.log("something wrong ")
        }
      })
  }
  return (
    
    <Router>
      <div className="container">
     
          
      <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAddTask={showAddTask}
          />
    
        <Routes>
         <Route path="/" element={
            <>
             {!isLogged ?
              (  
              <>  <Login onLogin={() => dispatch(login())} /> 
                      <AccountLink text="New User ?"
                                   TexttoLink="Registration" 
                                   href="/registration" />
                </>
             ):""}
             </> } />
          <Route path="/registration" element={
          <>
          <Register />
          <AccountLink text="already have an account ?"
                                   TexttoLink="Login" 
                                   href="/" />
          
          </>} />
          <Route 
            path="/task"
            element={
              <>
               <Logout
                color="red"
                text="Logout"
                onClick={() => dispatch(logout())}/>
                
         
                {showAddTask && <AddTask onAdd={addTask} />} 
               
                {  tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                    
                  />
                  ) : (
                  "No  Task to Show"
                )}
              </>
            }
          />

          <Route path="/updatetask/:task" element={ <Update  />} />
          
          </Routes>
         
      </div>
    
  </Router>

  );
}

export default App;
