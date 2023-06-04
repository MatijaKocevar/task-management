import { Task } from "../../../../types/types";
import StatusSwitch from "../../../shared/toogleSwitch/toggleSwitch";
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
			const encodedSearchTerm = encodeURIComponent(filter);
			const response = await fetch(`https://localhost:44434/api/tasks/search?searchTerm=${encodedSearchTerm}`);
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
		if (filter != "") loadFilteredTasks();
		else loadAllTasks();
	}, [filter, loadAllTasks, loadFilteredTasks]);

	useEffect(() => {
		if ((existingTaskId && !tasks.some((task) => task.id === existingTaskId) && updateList) || updateList) {
			loadAllTasks();
			setUpdateList(false);
		}
	}, [existingTaskId, setUpdateList, loadAllTasks, tasks, updateList]);

	const handleToggleStatus = async (id: number, newStatus: boolean) => {
		try {
			const response = await fetch(`/api/tasks/${id}/status`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newStatus),
			});

			if (response.ok) {
				console.log("Task status updated successfully");

				setTasks((prevTasks) => {
					const prevTask = prevTasks.find((task) => task.id === id);

					if (prevTask) {
						prevTask.status = newStatus;
					}

					return [...prevTasks];
				});
			}
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

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
							<StatusSwitch
								title='Status'
								status={task.status}
								taskId={task.id}
								onToggle={(newStatus) => {
									handleToggleStatus(task.id, newStatus);
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TaskList;
