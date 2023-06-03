import { useEffect, useMemo, useState } from "react";
import "./taskStyle.scss";
import ToggleSwitch from "../../../shared/toogleSwitch/toggleSwitch";
import { Task, newTask } from "../../../../types/types";
import TaskToolbar from "./component/taskToolbar";

interface TaskProps {
	existingTaskId?: number;
	setExistingTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
	setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskSection = (props: TaskProps) => {
	const { existingTaskId, setExistingTaskId, setUpdateList } = props;
	const [task, setTask] = useState<Task>(newTask);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
	const [taskId, setTaskId] = useState<number>(0);

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const response = await fetch(`https://localhost:44434/api/tasks/${existingTaskId}`);
				const responseData: Task = await response.json();
				if (responseData) setTask(responseData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (existingTaskId) {
			fetchTask();
			setHasUnsavedChanges(false);
		}
	}, [existingTaskId]);

	useEffect(() => {
		if (taskId && taskId !== task.id) {
			setTask({ ...task, id: taskId });
			setHasUnsavedChanges(false);
		}
	}, [taskId, task]);

	const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask({ ...task, title: e.target.value });
		if (!hasUnsavedChanges) setHasUnsavedChanges(true);
	};

	const handleOnChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTask({ ...task, description: e.target.value });
		if (!hasUnsavedChanges) setHasUnsavedChanges(true);
	};

	return (
		<div className='task-section'>
			<TaskToolbar
				hasUnsavedChanges={hasUnsavedChanges}
				setExistingTaskId={setExistingTaskId}
				setHasUnsavedChanges={setHasUnsavedChanges}
				setTask={setTask}
				setUpdateList={setUpdateList}
				task={task}
				existingTaskId={existingTaskId}
				setTaskId={setTaskId}
			/>
			{task && (
				<div className='task-item'>
					<div className='task-item__status-row'>
						<div className='task-item__status-title-col'>
							<input type='text' placeholder='Task title...' className='task-item__title' value={task.title} onChange={handleOnChangeTitle} />
							{<div className='task-item__id'>id: {task.id == 0 ? "" : task.id}</div>}
							<ToggleSwitch title='Status' status={task.status} setTask={setTask} setHasUnsavedChanges={setHasUnsavedChanges} />
						</div>
					</div>
					<div className='task-item__description'>
						<textarea className='description' placeholder='Task description...' value={task.description} onChange={handleOnChangeDescription} />
					</div>
				</div>
			)}
		</div>
	);
};

export default TaskSection;
