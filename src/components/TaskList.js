import React from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleCompletion, editTask, deleteTask, handleDragEnd, darkMode }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks" direction="horizontal">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-5 flex flex-wrap gap-4 justify-center">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} toggleCompletion={toggleCompletion} editTask={editTask} deleteTask={deleteTask} darkMode={darkMode} />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
