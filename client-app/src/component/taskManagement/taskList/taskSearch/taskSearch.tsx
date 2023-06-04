import React, { useCallback, useEffect, useRef, useState } from "react";
import "./taskSearchStyle.scss";

interface SearchInputProps {
	onSearch: (searchTerm: string) => void;
}

const TaskSearch: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const timeoutId = useRef<number>();

	useEffect(() => {
		if (timeoutId) clearTimeout(timeoutId.current);

		//throttle the search
		timeoutId.current = setTimeout(() => {
			onSearch(searchTerm);
			timeoutId.current = undefined;
		}, 500);

		return () => {
			if (timeoutId) clearTimeout(timeoutId.current);
		};
	}, [searchTerm, onSearch]);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = event.target.value;
		setSearchTerm(newSearchTerm);
	}, []);

	return <input type='text' placeholder='Search...' value={searchTerm} onChange={handleChange} />;
};

export default TaskSearch;
