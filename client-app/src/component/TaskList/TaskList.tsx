import "./TaskListStyle.scss";
import { useEffect, useRef, useState } from "react";

export const TaskList = () => {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(`https://localhost:44434/api/tasks`);
        const responseData: Task[] = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllTasks();
  }, []);

  return (
    <div className="search-section">
      <h1>Task List</h1>
      {data.map((task: Task) => {
        return (
          <div className="task-item" key={task.id}>
            <div className="task-item__description">{task.description}</div>
            {task.status && (
              <input className="task-item__status" type="checkbox" checked />
            )}
            {!task.status && (
              <input className="task-item__status" type="checkbox" />
            )}
          </div>
        );
      })}
    </div>
  );
};
