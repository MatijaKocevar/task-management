import { useEffect, useState } from "react";
import "./taskStyle.scss";
import ToggleSwitch from "../../../shared/toogleSwitch/toggleSwitch";
import { Task } from "../../../../types/types";

interface TaskProps {
	id?: number;
	setExistingTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
	setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskSection = (props: TaskProps) => {
	const [task, setTask] = useState<Task>({
		id: 0,
		title: "",
		description: "",
		status: false,
	});
	const { id, setExistingTaskId, setUpdateList } = props;

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const response = await fetch(`https://localhost:44434/api/tasks/${id}`);
				const responseData: Task = await response.json();
				setTask(responseData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (id) fetchTask();
	}, [id]);

	// useEffect(() => {
	// 	if (task) {
	// 		console.log(task);
	// 	}
	// }, [task]);

	const handleNewTask = () => {
		setTask({
			id: 0,
			title: "",
			description: "",
			status: false,
		});
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
				setExistingTaskId(responseData.id);
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
		} else {
			await updateTask();
			setUpdateList(true);
		}
	};

	return (
		<div className='task-section'>
			<div className='actions'>
				<h1 className='section__title'>Task</h1>
				<div className='action-buttons'>
					<button className='section__button' onClick={handleNewTask}>
						New Task
					</button>
					<button className='section__button' onClick={handleSaveChanges}>
						Save changes
					</button>
				</div>
			</div>
			{task && (
				<div className='task-item'>
					<div className='task-item__status-row'>
						<div className='task-item__status-title-col'>
							<input
								type='text'
								placeholder='Task title...'
								className='task-item__title'
								value={task.title}
								onChange={(e) => setTask({ ...task, title: e.target.value })}
							/>
							{task.id > 0 && <div className='task-item__id'>id: {task.id == 0 ? "" : task.id}</div>}
							<ToggleSwitch title='Status' status={task.status} setTask={setTask} />
						</div>
					</div>
					<div className='task-item__description'>
						<textarea
							className='description'
							placeholder='Task description...'
							value={task.description}
							onChange={(e) => setTask({ ...task, description: e.target.value })}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
