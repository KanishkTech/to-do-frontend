import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://to-do-backend-gl63.onrender.com"; // Your Render URL

function App() {
  const [todos, setTodos] = useState([]); 
  const [newTask, setNewTask] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); 
  const [editText, setEditText] = useState(""); 

  useEffect(() => {
    fetchTodos();
  }, []);

  // --- API Functions (GET, POST, DELETE, PUT) ---

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data); 
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask) return; 
    const todoData = { task: newTask };
    try {
      const response = await axios.post(`${API_URL}/todos`, todoData);
      setTodos([...todos, response.data]); 
      setNewTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, { task: editText });
      setTodos(
        todos.map(todo => (todo.id === id ? response.data : todo))
      );
      setEditingTodo(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleStartEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditText(todo.task);
  };

 
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16">
      
      <h1 className="text-5xl font-bold mb-8">FARM Stack To-Do</h1>

      
      <form onSubmit={handleAddTask} className="flex mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task here..."
          className="bg-gray-700 border-2 border-gray-600 rounded-l-md p-3 text-lg focus:outline-none focus:border-blue-500 text-white w-80"
        />
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 p-3 text-lg rounded-r-md font-semibold"
        >
          Add Task
        </button>
      </form>

      <div className="w-full max-w-lg">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className="group bg-gray-800 p-4 rounded-md mb-3 flex justify-between items-center"
          >
            {editingTodo === todo.id ? (
              // --- EDITING MODE ---
              <div className="flex w-full">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-gray-600 p-2 text-lg rounded-l-md w-full focus:outline-none"
                  autoFocus
                />
                <button 
                  onClick={() => handleSaveEdit(todo.id)}
                  className="bg-green-600 hover:bg-green-700 p-2 px-4 rounded-r-md font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              // --- DISPLAY MODE ---
              <>
                <span 
                  className="text-lg cursor-pointer"
                  onClick={() => handleStartEdit(todo)} 
                >
                  {todo.task}
                </span>
                
                {/* Buttons on hover */}
                <div className="hidden group-hover:flex space-x-2">
                  
                  {/* Complete Button */}
                  <button 
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 bg-gradient-to-r from-gray-700 to-gray-800 text-green-400 rounded-full hover:from-gray-600 hover:to-gray-700 hover:text-green-300 transition-all duration-200"
                    title="Complete"
                  >
                    <i class="ri-check-line text-xl"></i>
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 bg-gradient-to-r from-gray-700 to-gray-800 text-red-400 rounded-full hover:from-gray-600 hover:to-gray-700 hover:text-red-300 transition-all duration-200"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-line text-xl"></i>
                  </button>

                </div>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;