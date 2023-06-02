import "./App.scss";
import { TaskList } from "./component/TaskList/TaskList";
import { Task } from "./component/Task/Task";
import { useState } from "react";

function App() {
  const [existingTaskId, setExsitingTaskId] = useState<number>();

  return (
    <>
      <div className="task-management-wrapper">
        <h1 className="title">Task Management</h1>
        <div className="sections">
          <TaskList setExistingTaskId={setExsitingTaskId} />
          <Task id={existingTaskId} />
        </div>
      </div>
    </>
  );
}

export default App;
