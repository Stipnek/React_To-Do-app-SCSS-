import './Task.scss';
import { FaToggleOn } from 'react-icons/fa';
import { FaToggleOff } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';



function Task(props) {

  //status changer in firebase
  const handleStatusClick = async () => {
    const id = props.task.id;
    const taskDocRef = doc(db, 'tasks', id);
    try {
      await updateDoc(taskDocRef, { done: !props.task.done });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  //remove task 
  const handleRemoveClick = async () => {
    const id = props.task.id;
    const taskDocRef = doc(db, 'tasks', id);
    try {
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }

  return (
    <div className="taskMainContainer">
      <h3 className="taskDescription">{props.task.description}</h3>
      <div className="taskId">
        ID: {props.task.id} <br />
      </div>
      <div>
        Status:<span style={{ color: props.task.done ? 'green' : 'blue' }}>
          {props.task.done ? " Completed" : " Open"}</span>
      </div>

      <div className="buttonTaskContainer">
        <button
          className="taskButtons"
          onClick={handleStatusClick}
        >
          <span className="taskIcon">
            {props.task.done ? <FaToggleOn /> : <FaToggleOff />}
          </span>
          Change Status
        </button>

        <button
          className="taskButtons"
          onClick={handleRemoveClick}
        >
          <span className="taskIcon" style={{ color: 'red' }}>
            < FaTrashAlt />
          </span>
          Remove Task
        </button>
      </div>
    </div>
  );
}
export default Task;


