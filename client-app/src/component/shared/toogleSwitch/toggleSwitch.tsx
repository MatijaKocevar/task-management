import React, { useEffect, useState } from "react";
import "./toggleSwitch.scss";
import checkSvg from "./check.svg";
import inProgressSvg from "./inProgress.svg";
import { Task } from "../../../types/types";

interface ToggleSwitchProps {
	title?: string;
	status: boolean;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
	setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ title, status, setTask, setHasUnsavedChanges }) => {
	const [isChecked, setIsChecked] = useState<boolean>(status);

	useEffect(() => {
		setIsChecked(status);
	}, [status]);

	const handleChange = () => {
		const newStatus = !isChecked;
		setIsChecked(newStatus);
		setTask((prevState) => ({ ...prevState, status: newStatus }));
		setHasUnsavedChanges(true);
	};

	return (
		<div className={`toggle-switch ${isChecked ? "toggle-switch-checked" : ""}`} title={title ?? ""}>
			<input type='checkbox' id='toggleSwitch' checked={isChecked} onChange={handleChange} style={{ display: "none" }} />
			<label className='toggle-switch-toggle' htmlFor='toggleSwitch'>
				<div className='toggle-switch-labels'>
					<div className={`toggle-switch-label ${!isChecked ? "toggle-switch-label-selected" : ""}`}>
						<img className='in-progress' src={inProgressSvg} alt='inProgressSvg' />
					</div>
					<div className={`toggle-switch-label ${isChecked ? "toggle-switch-label-selected" : ""}`}>
						<img className='check-mark' src={checkSvg} alt='checkMark' />
					</div>
				</div>
			</label>
		</div>
	);
};

export default ToggleSwitch;
