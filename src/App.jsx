import { useState, useEffect } from "react"; 
// Import React hooks: 
// useState → stores data
// useEffect → runs side effects (like saving to localStorage)

function App() {

  // Stores the current input text
  const [text, setText] = useState("");

  // Stores list of tasks
  // This function runs ONLY once when app loads
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks"); 
    // Try to get saved tasks from browser storage

    return saved ? JSON.parse(saved) : []; 
    // If found → convert string back to array
    // If not → start with empty array
  });

  // Runs every time "tasks" changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Save updated tasks to localStorage as a string
  }, [tasks]); // dependency: runs whenever tasks changes

  // Tracks which task is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // Stores text while editing a task
  const [editText, setEditText] = useState("");

  // Adds a new task
  function addTask() {
    if (!text.trim()) return; 
    // Prevent empty or whitespace-only tasks

    setTasks([...tasks, text]); 
    // Create new array with old tasks + new task

    setText(""); 
    // Clear input field
  }

  // Starts editing a specific task
  function startEdit(index) {
    setEditingIndex(index); 
    // Remember which task is being edited

    setEditText(tasks[index]); 
    // Put current task text into edit input
  }

  // Saves edited task
  function saveEdit(index) {
    if (!editText.trim()) return; 
    // Prevent saving empty text

    const updatedTasks = tasks.map((task, i) =>
      i === index ? editText : task
    );
    // Loop through tasks:
    // If index matches → replace with edited text
    // Else → keep original task

    setTasks(updatedTasks); 
    // Update state with new array

    setEditingIndex(null); 
    // Exit editing mode

    setEditText(""); 
    // Clear edit input
  }

  // Deletes a task
  function deleteTask(index) {
    if (!confirm("Delete this task?")) return;
    // Ask user for confirmation before deleting

    const updatedTasks = tasks.filter((task, i) => i !== index);
    // Keep all tasks EXCEPT the one with matching index

    setTasks(updatedTasks); 
    // Update state

    // If the deleted task was being edited → reset editing state
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditText("");
    }
  }

  return (
    <div>
      <h1>My CRUD App</h1>

      {/* Form allows pressing Enter to submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page refresh
          addTask(); // add task when submitted
        }}
      >
        <input
          value={text} 
          // input value is controlled by React state

          onChange={(e) => setText(e.target.value)} 
          // update state when user types
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                {/* Edit mode */}
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => saveEdit(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {/* Normal display mode */}
                {task}

                <button onClick={() => startEdit(index)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(index)}>
                  Delete
                  
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;