import React, { useState } from "react";
import "./taskSearchStyle.scss";

interface SearchInputProps {
	onSearch: (searchTerm: string) => void;
}

const TaskSearch: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSubmit} className='search-input'>
			<input type='text' placeholder='Search...' value={searchTerm} onChange={handleChange} />
			<button type='submit'>Search</button>
		</form>
	);
};

export default TaskSearch;
