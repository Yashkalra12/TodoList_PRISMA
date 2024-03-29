// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000";

// interface Todo {
//   todo_id: number;
//   todo_desc: string;
//   todo_completed: boolean;
// }

// function App() {
//   const [inputTodo, setInputTodo] = useState("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editTodoDesc, setEditTodoDesc] = useState("");
//   const [editTodoId, setEditTodoId] = useState(0);
//   const [editTodoChecked, setEditTodoChecked] = useState(false);

//   useEffect(() => {
//     axios.get("/todos").then((resp) => {
//       setTodos(resp.data);
//     });
//   }, []);

//   async function addTodo() {
//     const data = {
//       desc: inputTodo,
//       completed: false,
//     };
//     try {
//       const resp = await axios.post("/todos", data);
//       if (resp.data.success) {
//         setTodos((prevTodos) => [...prevTodos, resp.data.newTodo.rows[0]]);
//         setInputTodo("");
//       }
//     } catch (error) {
//       console.error("Error adding todo:", error);
//     }
//   }

//   function editTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: Todo) {
//     e.preventDefault();
//     setEditMode(true);
//     setEditTodoDesc(todo.todo_desc);
//     setEditTodoId(todo.todo_id);
//     setEditTodoChecked(todo.todo_completed);
//   }


//   async function updateTodo(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const data = {
//       desc: editTodoDesc,
//       completed: editTodoChecked,
//     };
//     try {
//       const resp = await axios.put(`/todos/${editTodoId}`, data);
//       if (resp.data.success) {
      
//         setTodos((prevTodos) =>
//           prevTodos.map((todo) =>
//             todo.todo_id === editTodoId ? { ...todo, todo_desc: editTodoDesc, todo_completed: editTodoChecked } : todo
//           )
//         );
//         setEditMode(false);
//         console.log(resp);
//       }
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     }
//   }

//   async function deleteTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: Todo) {
//     e.preventDefault();
//     try {
//       const resp = await axios.delete(`/todos/${todo.todo_id}`);
//       if (resp.data.success) {
//         setTodos((prevTodos) =>
//           prevTodos.filter((t) => t.todo_id !== todo.todo_id)
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   }

//   async function clearAllTodos() {
//     try {
//       const resp = await axios.delete("/todos");
//       if (resp.data.success) {
//         setTodos([]);
//       }
//     } catch (error) {
//       console.error("Error clearing all todos:", error);
//     }
//   }

//   if (editMode) {
//     return (
//       <form
//         onSubmit={updateTodo}
//         className="flex flex-col items-center gap-8 pt-8 pb-24 bg-blue-50"
//       >
//         <div className="text-2xl">Edit Todo</div>
//         <div className="flex gap-4 pl-16">
//           <label className="text-xl">Todo Desc:</label>
//           <input
//             className="text-xl rounded-lg shadow-md"
//             type="text"
//             placeholder="Enter Todo"
//             value={editTodoDesc}
//             onChange={(e) => setEditTodoDesc(e.target.value)}
//           />
//         </div>
//         <div className="flex gap-4 pr-36">
//           <label className="text-xl">Completed:</label>
//           <input
//             type="checkbox"
//             checked={editTodoChecked}
//             onChange={(e) => setEditTodoChecked(e.target.checked)}
//           />
//         </div>
//         <button className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md">
//           Submit
//         </button>
//       </form>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center gap-8 pt-8 pb-32 bg-blue-50">
//       <div className="text-2xl">Todo List PostgreSQL</div>
//       <div className="flex gap-2">
//         <input
//           className="text-xl rounded-lg shadow-md p-2"
//           type="text"
//           placeholder="Enter Todo"
//           value={inputTodo}
//           onChange={(e) => setInputTodo(e.target.value)}
//         />
//         <button
//           onClick={addTodo}
//           className="text-lg bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-xl"
//         >
//           Add
//         </button>


//         <button
//           onClick={clearAllTodos}
//           className="text-lg bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded-xl"
//         >
//           Clear
//         </button>

        
//       </div>
//       {todos.length >= 1 && (
//         <div className="flex flex-col gap-2 border bg-blue-200 rounded-lg p-2 w-5/6">
//           {todos.map((todo, index) => {
//             return (
//               <div
//                 className="flex items-center justify-between bg-blue-700 rounded-md p-2 text-white"
//                 key={index}
//               >
//                 <div className="pl-1 flex gap-2 items-center">
//                   <input
//                     type="checkbox"
//                     checked={todo.todo_completed}
//                     readOnly
//                   />
//                   <div className="text-lg">{todo.todo_desc}</div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={(e) => editTodo(e, todo)}
//                     className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => deleteTodo(e, todo)}
//                     className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

interface Todo {
  todo_id: number;
  todo_desc: string;
  todo_completed: boolean;
}

function App() {
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoDesc, setEditTodoDesc] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodoChecked, setEditTodoChecked] = useState(false);

  useEffect(() => {
    axios.get("/todos").then((resp) => {
      setTodos(resp.data);
    });
  }, []);

  console.log(todos);
  

  async function addTodo() {
    const data = {
      desc: inputTodo,
      completed: false,
    };
    try {
      const resp = await axios.post("/todos", data);
      if (resp.data.success) {
        setTodos((prevTodos) => [...prevTodos, resp.data.newTodo.rows[0]]);
        setInputTodo("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }


  function editTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: Todo) {
    e.preventDefault();
    setEditMode(true);
    setEditTodoDesc(todo.todo_desc);
    setEditTodoId(todo.todo_id);
    setEditTodoChecked(todo.todo_completed);
  }

  function handleCheckboxChange() {
    setEditTodoChecked((prevChecked) => !prevChecked);
  }

  async function updateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      desc: editTodoDesc,
      completed: editTodoChecked,
    };
    try {
      const resp = await axios.put(`/todos/${editTodoId}`, data);
      if (resp.data.success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === editTodoId
              ? { ...todo, todo_desc: editTodoDesc, todo_completed: editTodoChecked }
              : todo
          )
        );
        setEditMode(false);
        console.log(resp);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: Todo) {
    e.preventDefault();
    try {
      const resp = await axios.delete(`/todos/${todo.todo_id}`);
      if (resp.data.success) {
        setTodos((prevTodos) =>
          prevTodos.filter((t) => t.todo_id !== todo.todo_id)
        );
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function clearAllTodos() {
    try {
      const resp = await axios.delete("/todos");
      if (resp.data.success) {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error clearing all todos:", error);
    }
  }

  if (editMode) {
    return (
      <form
        onSubmit={updateTodo}
        className="flex flex-col items-center gap-8 pt-8 pb-24 bg-blue-50"
      >
        <div className="text-2xl">Edit Todo</div>
        <div className="flex gap-4 pl-16">
          <label className="text-xl">Todo Desc:</label>
          <input
            className="text-xl rounded-lg shadow-md"
            type="text"
            placeholder="Enter Todo"
            value={editTodoDesc}
            onChange={(e) => setEditTodoDesc(e.target.value)}
          />
        </div>
        <div className="flex gap-4 pr-36">
          <label className="text-xl">Completed:</label>
          <input
            type="checkbox"
            checked={editTodoChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md">
          Submit
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-32 bg-blue-50">
      <div className="text-2xl">Todo List PostgreSQL</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-lg shadow-md p-2"
          type="text"
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="text-lg bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-xl"
        >
          Add
        </button>
        <button
          onClick={clearAllTodos}
          className="text-lg bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded-xl"
        >
          Clear
        </button>
      </div>
      {todos.length >= 1 && (
        <div className="flex flex-col gap-2 border bg-blue-200 rounded-lg p-2 w-5/6">
          {todos.map((todo, index) => {
            return (
              <div
                className="flex items-center justify-between bg-blue-700 rounded-md p-2 text-white"
                key={index}
              >
                <div className="pl-1 flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={todo.todo_completed}
                    readOnly
                  />
                  <div className="text-lg">{todo.todo_desc}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => editTodo(e, todo)}
                    className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteTodo(e, todo)}
                    className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
