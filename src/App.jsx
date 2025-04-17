import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    const savedTheme = localStorage.getItem("darkMode") === "true";
    if (savedTodos) setTodos(savedTodos);
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("darkMode", darkMode);
  }, [todos, darkMode]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTodos = Array.from(todos);
    const [movedItem] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, movedItem);

    setTodos(updatedTodos);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>React Todo App</h1>

      {/* 🌙 Theme Toggle */}
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* 🔍 Search */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ➕ Add */}
      <div className="input-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filters */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
          Active
        </button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
          Completed
        </button>
      </div>

      {/* 📦 Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList
          todos={getFilteredTodos()}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
