import { useNavigate } from "react-router-dom";
const Logout = ({ color, text, onClick }) => {
    const navigate=useNavigate()
    return (
      <button
        onClick={()=>{onClick(); navigate('/')}}
        style={{ backgroundColor: color }}
        className="btn"
      >
        {text}
      </button>
    );
  };
  
  export default Logout;
  