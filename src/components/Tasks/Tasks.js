import React, { useState } from "react";
import Task from './Task/Task';
import './Tasks.scss';
import { FaBan } from 'react-icons/fa';

const Tasks = ({ tasks, onClearTask, onStatusChange, onTaskRemove }) => {


  return (
    <div className="taskDiv">
      <h2 className="tasksTitle">There are the tasks:</h2>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
      <button
        onClick={onClearTask}
        className="clearButton"
      >
        < FaBan />
        Clear Tasks
      </button>
    </div>
  );
};

export default Tasks;
