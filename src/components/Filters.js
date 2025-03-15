import React from "react";

const Filters = ({ filterCategory, setFilterCategory, filterPriority, setFilterPriority, filterStatus, setFilterStatus, darkMode }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={`border rounded p-2 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}>
        <option value="All">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className={`border rounded p-2 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}>
        <option value="All">All Priorities</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">🔵 Low</option>
      </select>

      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={`border rounded p-2 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}>
        <option value="All">All Statuses</option>
        <option value="Completed">✅ Completed</option>
        <option value="Pending">⏳ Pending</option>
      </select>
    </div>
  );
};

export default Filters;
