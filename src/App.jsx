import React, { useState, useEffect } from 'react';
import axios from 'axios';
// './App.css' waali line humne hata di hai

const API_URL = "https://to-do-backend-gl63.onrender.com";

function App() {
  const [todos, setTodos] = useState([]); 
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  // GET Request
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data); 
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // POST Request
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16">
      
      <h1 className="text-5xl font-bold mb-8">FARM Stack To-Do</h1>


      <form onSubmit={handleAddTask} className="flex mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Naya task likho..."
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
            className="bg-gray-800 p-4 rounded-md mb-3 text-lg"
          >
            {todo.task}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;