import React,{ useState ,useEffect} from "react"
import axios from "axios";
import{useNavigate} from 'react-router-dom'
const Register = () =>{
  const [name,setName]=useState();
  const [emailid,setEmail]=useState();
  const [password,setPassword]=useState();

  
//  useEffect(()=>console.log(hobby),[hobby])
  let navigate= useNavigate();
  const onSubmit = (e) =>{
    e.preventDefault()
    if(!name){
        alert("Please Enter Name ")
       
    }
    if(!emailid){
        alert("Please Enter Emailid")
        
    }
    
    if(!password){
        alert("Please Enter Password")
        
    }
    const user ={emailid,name,password}
    axios.post('/api/register',user).then((res)=>{
        console.log(res.data)
        if(res.data.code === 200){
            navigate("/")
        }else{
            alert("Something Wrong Please try Again")
        }
    })
    setName("")
    setPassword("")
    setEmail("")
    
}
    return(
        <>
            <h1 className="bg-dark text-white text-center mt-3">Registration</h1>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label><b>User Name</b></label>
                    <input 
                    type="text"
                    placeholder="Enter User Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                     />
                </div>

                <div className="form-control">
                    <label><b>Email Id</b></label>
                    <input 
                    type="email"
                    placeholder="Enter Your Emailid"
                    value={emailid}
                    onChange={(e)=> setEmail(e.target.value)}
                     />
                </div>
               

                <div className="form-control">
                    <label><b>User Password</b></label>
                    <input 
                    type="password"
                    placeholder="Enter User Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                     />
                </div>
              
               
                <input type="submit"  value="Register" className="btn btn-block " />
            </form>
        </>
    )
}
export default Register