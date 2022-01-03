import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailid) {
      alert("Please enter a name");
      return;
    }
    if (!password) {
      alert("Please enter a password");
      return;
    }
    axios.post("/api/login",{emailid:emailid,password:password})
    .then(res =>{console.log(res.data)
            if (res.data.code === 200) {
            onLogin();
            navigate('/task');
    } else {
      alert("Please Enter Valid User name and password");
    }
})
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>UserName</label>
        <input
          type="email"
          placeholder="Add userName"
          value={emailid}
          onChange={(e) => setEmailid(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Passwod"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <input type="submit" value="Login" className="btn btn-block " />
    </form>
  );
};

export default Login;
