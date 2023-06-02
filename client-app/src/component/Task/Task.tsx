import { useEffect, useState } from "react";
import "./TaskStyle.scss";

interface TaskProps {
  id?: number;
}

export const Task = (props: TaskProps) => {
  const [task, setData] = useState<Task>();
  const { id } = props;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`https://localhost:44434/api/tasks/${id}`);
        const responseData: Task = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) fetchTask();
  }, [id]);

  useEffect(() => {
    if (task) {
      console.log(task);
    }
  }, [task]);

  return (
    <div className="create-section">
      <h1>Task</h1>
      {task && (
        <div className="task-item">
          <div className="task-item__status-row">
            <div className="task-item__id">ID: {task.id}</div>
            <div className="task-item__title"> {task.title}</div>
            {task.status && (
              <input
                className="task-item__status"
                type="checkbox"
                checked
                readOnly
              />
            )}
            {!task.status && (
              <input
                className="task-item__status"
                type="checkbox"
                readOnly
                checked={false}
              />
            )}
          </div>
          <div className="task-item__description">
            Description: {task.description}
          </div>
        </div>
      )}
    </div>
  );
};
