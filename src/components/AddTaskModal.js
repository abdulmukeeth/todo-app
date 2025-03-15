import React from "react";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";

const AddTaskModal = ({ isOpen, closeModal, input, setInput, category, setCategory, priority, setPriority, dueDate, setDueDate, addTask, editingTask, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`p-5 rounded shadow-lg w-80 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-xl font-bold mb-3">{editingTask ? "Edit Task" : "Add Task"}</h2>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Task Name" className={`border rounded p-2 w-full mb-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`} />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`border rounded p-2 w-full mb-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={`border rounded p-2 w-full mb-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🔵 Low</option>
        </select>

        <DatePicker 
          selected={dueDate} 
          onChange={(date) => setDueDate(date)} 
          placeholderText="Pick Due Date" 
          className={`border rounded p-2 w-full mb-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        </DatePicker>

        <div className="flex justify-between">
          <button onClick={closeModal} className="px-4 py-2 bg-red-400 text-white rounded">Cancel</button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={addTask} 
            className="px-4 py-2 bg-blue-500 text-white rounded">
            {editingTask ? "Update" : "Add"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
