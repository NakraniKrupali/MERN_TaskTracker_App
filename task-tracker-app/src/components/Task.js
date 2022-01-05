import { FaTimes,FaEdit } from "react-icons/fa";
import Update from './Update'
import { useNavigate } from "react-router-dom";
const Task = ({ task, onDelete, onToggle }) => {
    const navigate=useNavigate();
  return (
      
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task._id,!task.reminder)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task._id)}
        />
      </h3>
      <p>{task.dayTime} 
      <h3><FaEdit
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate('/updatetask',{ state: task})}/></h3>
        </p>
    </div>
  );
};
export default Task;
