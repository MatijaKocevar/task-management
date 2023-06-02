import "./TaskListStyle.scss";
import { useEffect, useState } from "react";

interface TaskListProps {
  setExistingTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const TaskList = (props: TaskListProps) => {
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

  const handleTaskItemClick = (id: number) => {
    props.setExistingTaskId(id);
  };

  return (
    <div className="search-section">
      <h1>Task List</h1>
      <div className="tasks-wrapper">
        {data.map((task: Task) => {
          return (
            <div
              className="task-item"
              key={task.id}
              onClick={() => handleTaskItemClick(task.id)}
            >
              <div className="task-item__id">{task.id}</div>
              <div className="task-item__title">{task.title}</div>
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
          );
        })}
      </div>
    </div>
  );
};
