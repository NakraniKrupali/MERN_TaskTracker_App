import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Update = (props) => {
    const location = useLocation();

   // console.log(location.pathname.match.params);
   const taskData =[]
 // console.log(props.params.task)
  const navigate=useNavigate();
  const [text, setText] = useState(taskData.text);
  const [dayTime, setDay] = useState(taskData.dayTime);
  const [reminder, setReminder] = useState(taskData.reminder
    );

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    axios.put("/api/updatetask/reminder",{ text, dayTime, reminder })
    .then(res=>{console.log(res.data)
         if(res.data.code === 200){
             navigate('/task')
         }
    })
   // onUpdate({ text, dayTime, reminder });
    setText("");
    setDay("");
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={dayTime}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Update Task" className="btn btn-block" />
    </form>
  );
};

export default Update;