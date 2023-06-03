import { Task, newTask } from "../../../../../types/types";
import "./taskToolbarStyle.scss";

interface TaskToolbarProps {
	setExistingTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
	setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
	hasUnsavedChanges: boolean;
	setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
	task: Task;
	setTaskId: React.Dispatch<React.SetStateAction<number>>;
}

const TaskToolbar = (props: TaskToolbarProps) => {
	const { setExistingTaskId, setUpdateList, setTask, setHasUnsavedChanges, task, hasUnsavedChanges, setTaskId } = props;

	const handleNewTask = () => {
		setTaskId(newTask.id);
		setTask(newTask);
		setExistingTaskId(undefined);
		setHasUnsavedChanges(false);
	};

	const handleSaveChanges = async () => {
		const saveTask = async () => {
			try {
				const response = await fetch(`https://localhost:44434/api/tasks`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				const responseData: Task = await response.json();
				setTaskId(responseData.id);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const updateTask = async () => {
			try {
				await fetch(`https://localhost:44434/api/tasks/${task.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (task.id === 0) {
			await saveTask();
			setUpdateList(true);
			setHasUnsavedChanges(false);
		} else {
			await updateTask();
			setUpdateList(true);
			setHasUnsavedChanges(false);
		}
	};

	const handleDeleteTask = async () => {
		try {
			await fetch(`https://localhost:44434/api/tasks/${task.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(task),
			});

			setTask(newTask);
			setTaskId(newTask.id);
			setExistingTaskId(undefined);
			setUpdateList(true);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div className='actions'>
			<h1 className='section__title'>Task</h1>
			<div className='action-buttons'>
				<button className={`section__button ${task.id !== 0 ? "" : "disabled"}`} onClick={handleNewTask} disabled={task.id == 0}>
					New task
				</button>
				<button className={`section__button ${hasUnsavedChanges ? "" : "disabled"}`} onClick={handleSaveChanges} disabled={!hasUnsavedChanges}>
					Save changes
				</button>
				<button className={`section__button ${task.id !== 0 ? "" : "disabled"}`} onClick={handleDeleteTask} disabled={task.id == 0}>
					Delete task
				</button>
			</div>
		</div>
	);
};

export default TaskToolbar;
