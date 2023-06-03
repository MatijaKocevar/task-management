import { Task } from "../../../../types/types";
import TaskSearch from "./component/taskSearch";
import "./taskListStyle.scss";
import { useCallback, useEffect, useState } from "react";

interface TaskListProps {
	existingTaskId?: number;
	setExistingTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
	setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
	updateList: boolean;
}

const TaskList = (props: TaskListProps) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const { existingTaskId, setExistingTaskId, setUpdateList, updateList } = props;
	const [filter, setFilter] = useState<string>("");
	const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined);

	const getAllTasks = useCallback(async () => {
		try {
			const response = await fetch(`https://localhost:44434/api/tasks`);
			const responseData: Task[] = await response.json();
			return await responseData;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	const getFilteredTasks = useCallback(async () => {
		try {
			const response = await fetch(`https://localhost:44434/api/tasks/search?searchTerm=${filter}`);
			const responseData: Task[] = await response.json();
			return await responseData;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [filter]);

	const loadAllTasks = useCallback(async () => {
		const tasks = await getAllTasks();

		if (tasks) setTasks(tasks);
	}, [getAllTasks]);

	const loadFilteredTasks = useCallback(async () => {
		const tasks = await getFilteredTasks();

		if (tasks) setTasks(tasks);
	}, [getFilteredTasks]);

	const handleTaskItemClick = (id: number) => {
		setExistingTaskId(id);
		setSelectedTaskId(id);
	};

	const handleSearch = (searchTerm: string) => {
		setFilter(searchTerm);
	};

	useEffect(() => {
		if (filter) loadFilteredTasks();
		else loadAllTasks();
	}, [filter, loadAllTasks, loadFilteredTasks]);

	useEffect(() => {
		if ((existingTaskId && !tasks.some((task) => task.id === existingTaskId)) || updateList) {
			loadAllTasks();
			setUpdateList(false);
		}
	}, [existingTaskId, setUpdateList, loadAllTasks, tasks, updateList]);

	return (
		<div className='tasklist-section'>
			<h1>Task List</h1>
			<div className='search-container'>
				<TaskSearch onSearch={handleSearch} />
			</div>
			<div className='tasks-wrapper'>
				{tasks.map((task: Task) => {
					return (
						<div
							className={`task-item ${task.id === selectedTaskId && existingTaskId ? "task-item-selected" : ""}`}
							key={task.id}
							onClick={() => handleTaskItemClick(task.id)}
						>
							<div className='task-item__id'>{task.id}</div>
							<div className='task-item__title'>{task.title}</div>
							{task.status && <input className='task-item__status' type='checkbox' checked readOnly />}
							{!task.status && <input className='task-item__status' type='checkbox' readOnly checked={false} />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TaskList;
