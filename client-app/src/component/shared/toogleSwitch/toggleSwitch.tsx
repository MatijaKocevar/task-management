import React, { useEffect, useState } from "react";
import "./toggleSwitch.scss";
import checkSvg from "./check.svg";
import inProgressSvg from "./inProgress.svg";
import { Task } from "../../../types/types";

interface ToggleSwitchProps {
	title?: string;
	status: boolean;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ title, status, setTask }) => {
	const [isChecked, setIsChecked] = useState<boolean>();

	const handleChange = () => {
		setIsChecked(!isChecked);
		setTask((prevState) => ({ ...prevState, status: !isChecked }));
	};

	useEffect(() => {
		setIsChecked(status);
	}, [status]);

	return (
		<div className={`toggle-switch ${isChecked ? "toggle-switch-checked" : ""}`} title={title ?? ""}>
			<label className='toggle-switch-toggle' role='presentation' htmlFor='toggleSwitch' onClick={handleChange}>
				<input style={{ display: "none" }} name='toggleSwitch'></input>
			</label>

			<div className='toggle-switch-labels'>
				<div className={`toggle-switch-label ${!isChecked ? "toggle-switch-label-selected" : ""}`}>
					<img className='in-progress' src={inProgressSvg} alt='inProgressSvg' />
				</div>
				<div className={`toggle-switch-label ${isChecked ? "toggle-switch-label-selected" : ""}`}>
					<img className='check-mark' src={checkSvg} alt='checkMark' />
				</div>
			</div>
		</div>
	);
};

export default ToggleSwitch;
