import "./App.scss";
import { TaskList } from "./component/TaskList/TaskList";
import { Task } from "./component/Task/Task";

function App() {
  return (
    <>
      <div className="task-management-wrapper">
        <h1 className="title">Task Management</h1>
        <div className="sections">
          <TaskList />
          <Task />
        </div>
      </div>
    </>
  );
}

export default App;
