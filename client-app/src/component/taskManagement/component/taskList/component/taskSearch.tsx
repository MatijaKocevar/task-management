import React, { useEffect, useRef, useState } from "react";
import "./taskSearchStyle.scss";

interface SearchInputProps {
	onSearch: (searchTerm: string) => void;
}

const TaskSearch: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const timeoutId = useRef<number>();

	useEffect(() => {
		if (timeoutId) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = setTimeout(() => {
			onSearch(searchTerm);
			timeoutId.current = undefined;
		}, 300); // Set the throttle delay here (e.g., 300ms)

		// Cleanup the timeout when the component unmounts or when the search term changes
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId.current);
			}
		};
	}, [searchTerm, onSearch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = event.target.value;
		setSearchTerm(newSearchTerm);
	};

	return <input type='text' placeholder='Search...' value={searchTerm} onChange={handleChange} />;
};

export default TaskSearch;
