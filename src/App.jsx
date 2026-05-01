import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks]= useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  function addTask(){
    if (!text.trim()) return;
    
    setTasks([...tasks,text]);
    setText("");
  }
  function startEdit(index) {
  setEditingIndex(index);
  setEditText(tasks[index]);
}
function saveEdit(index) {
  if (!editText.trim()) return;
  const updatedTasks = tasks.map((task, i) =>
    i === index ? editText : task
  );

  setTasks(updatedTasks);
  setEditingIndex(null);
  setEditText("");
}
function deleteTask(index) {
  if (!confirm("Delete this task?")) return;

  const updatedTasks = tasks.filter((task, i) => i !== index);
  setTasks(updatedTasks);

  if (editingIndex === index) {
  setEditingIndex(null);
  setEditText("");
}
}
  return (
    <div>
      <h1>My CRUD App</h1>
      <form
  onSubmit={(e) => {
    e.preventDefault();
    addTask();
  }}
>
  <input
    value={text}
    onChange={(e) => setText(e.target.value)}
  />

  <button type="submit">
    Add
  </button>

</form>
<ul>
{tasks.map((task,index)=>(
  <li key={index}>

    {editingIndex === index ? (
      <>
        <input
          value={editText}
          onChange={(e)=>setEditText(e.target.value)}
        />

        <button onClick={()=>saveEdit(index)}>
          Save
        </button>
      </>
    ) : (
      <>
        {task}

        <button onClick={()=>startEdit(index)}>
          Edit
        </button>

<button onClick={()=>deleteTask(index)}>
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