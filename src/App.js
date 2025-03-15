import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";  
import Filters from "./components/Filters";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);

    const savedTheme = localStorage.getItem("darkMode");
    setDarkMode(savedTheme === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const addTask = () => {
    if (input.trim()) {
      if (editingTask) {
        setTasks(tasks.map(task =>
          task.id === editingTask.id
            ? { ...task, text: input, category, priority, dueDate }
            : task
        ));
        setEditingTask(null);
      } 
      else {
        const newTask = {
          id: uuidv4(),
          text: input,
          category,
          priority,
          dueDate,
          completed: false,
        };
        setTasks([...tasks, newTask]);
      }
      setInput("");
      setCategory("Work");
      setPriority("Medium");
      setDueDate(null);
      setIsModalOpen(false);
    }
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = task => {
    setInput(task.text);
    setCategory(task.category);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const toggleTaskCompletion = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDragEnd = result => {
    if (!result.destination) 
      return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  // Filtering Logic
  const filteredTasks = tasks.filter(task =>
    (filterCategory === "All" || task.category === filterCategory) &&
    (filterPriority === "All" || task.priority === filterPriority) &&
    (filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Pending" && !task.completed)
    ) &&
    (debouncedQuery === "" || task.text.toLowerCase().includes(debouncedQuery.toLowerCase()))
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setInput(""); 
    setCategory("Work");  
    setPriority("Medium"); 
    setDueDate(null); 
    setEditingTask(null); 
  };
  

  return (
    <div className={`flex flex-col items-center min-h-screen p-5 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      
      {/* Theme Toggle */}
      <ThemeToggle 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <h1 
        className="text-3xl font-bold mb-5">
        To-Do List
      </h1>

      {/* Add Task Button */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-4 px-4 py-2 rounded bg-blue-500 text-white">
        + Add Task
      </button>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        closeModal={closeModal} 
        input={input}
        setInput={setInput}
        category={category}
        setCategory={setCategory}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addTask={addTask}
        editingTask={editingTask}
        darkMode={darkMode}
      />

      {/* Search */}
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        darkMode={darkMode} 
      />

      {/* Filters */}
      <Filters
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        darkMode={darkMode}
      />

      {/* Task List */}
      <TaskList 
        tasks={filteredTasks} 
        toggleCompletion={toggleTaskCompletion} 
        editTask={editTask} 
        deleteTask={deleteTask} 
        handleDragEnd={handleDragEnd} 
        darkMode={darkMode} 
      />

    </div>
  );
}

export default App;
