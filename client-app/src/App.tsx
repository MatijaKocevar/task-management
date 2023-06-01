import "./App.scss";

function App() {
  const tasks: any = fetch("https://localhost:44434/api/tasks")
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
    });
  return (
    <>
      <div className="task-management-wrapper">
        <h1 className="title">Task Management</h1>
        <div className="sections">
          <div className="search-section">Search</div>
          <div className="create-section">New Task</div>
        </div>
      </div>
    </>
  );
}

export default App;
