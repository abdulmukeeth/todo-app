import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

const TaskItem = ({ task, index, toggleCompletion, editTask, deleteTask, darkMode }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <motion.li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`w-64 p-4 shadow rounded-md ${task.completed ? "bg-green-300 text-black" : darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          layout
        >
          <div onClick={() => toggleCompletion(task.id)}>
            <p className={`${task.completed ? "line-through" : ""} text-xl`}>{task.text}</p>
            <div className="text-xs mt-1 text-gray-600">
              <span className="block">
                <strong>Category:</strong> {task.category}
              </span>
              <span className="block">
                <strong>Priority:</strong> {task.priority}
              </span>
              <span className="block">
                <strong>Due:</strong>{" "}
                {task.dueDate ? task.dueDate.toLocaleDateString() : "None"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => editTask(task)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </motion.li>
      )}
    </Draggable>
  );
};

export default TaskItem;
