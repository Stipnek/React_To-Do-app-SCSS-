import React, { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';


import './Form.scss'

const Form = () => {

  const [userDescription, setUserDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Add task in firebase
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userDescription === '') {
      setIsInvalid(true);
    } else {
      setIsLoading(true);
      await addDoc(collection(db, 'tasks'),
        { description: userDescription, done: taskStatus, createdAt: new Date() })
        .then((docRef) => console.log('Success:', docRef))
        .catch((err) => console.log('Error:', err));
      setIsLoading(false)
      setIsInvalid(false);
      setUserDescription('');
    }
  }

  const handleUserDescription = (event) => {
    setUserDescription(event.target.value);
    // console.log(userDescription);
  }

  const handleTaskStatus = (e) => {
    setTaskStatus(e.target.value);
    // console.log(taskStatus);
  }


  return (
    <form onSubmit={handleSubmit} className="taskAdd">
      <h2 className="addTitle">Add a new task:</h2>
      <div className="mainFormContainer">
        {isInvalid && (
          <h5 className="errorDescription">
            Enter the description!
          </h5>
        )}
        {isLoading && (
          <h4>
            Saving...
          </h4>
        )}
        <label className="inputDesc">
          Description:
          <input type='text'
            maxLength={150}
            value={userDescription}
            onChange={handleUserDescription}
            className='descField'
          />
        </label>

        <label className="inputSelect">
          Status:
          <select
            value={taskStatus}
            onChange={handleTaskStatus}
            className='selectField'
          >
            Status:
            {/* <option value=''>-</option> */}
            <option value={false}>Open</option>
            <option value={true}>Completed</option>
          </select>
        </label>
        <button className="addButton"><MdAddCircleOutline />Add</button>
      </div>
    </form>
  )
}

export default Form;