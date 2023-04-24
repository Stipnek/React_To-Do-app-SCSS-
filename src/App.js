import React, { useEffect, useState } from "react";
// import uuid from 'react-uuid';
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import { Routes, Route } from "react-router-dom";

import "./index.scss";

import Help from "./components/Help/Help";
import Introduction from "./components/Help/Introduction";
import Add from "./components/Help/Add";
import Remove from "./components/Help/Remove";
import PageNotFound from "./components/PageNotFound/PNF";

import { db } from "./firebase/firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

function App() {
  //Tasks
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const tasksCollectionRef = collection(db, 'tasks');

  //Load collection
  useEffect(() => {
    (async () => {
      const data = await getDocs(tasksCollectionRef);
      const sortedTasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((b, a) => {
        return a.createdAt - b.createdAt;
      });
      setTasks(sortedTasks);
      setLoading(false);
    })();
  }, [tasksCollectionRef]);


  //All clear from firebase
  function handleClearTasks() {
    getDocs(tasksCollectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  }


  return (
    <>
      <Header />
      <div className="mainContainer">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoading ? (
                  <p className="loadingMessage">Loading...</p>
                ) : (
                  <>
                    {tasks.length === 0 ? (
                      <p className="noTasksMessage">There are no tasks to show</p>
                    ) : (
                      <Tasks
                        tasks={tasks}
                        onClearTask={handleClearTasks}
                      />
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/add"
            element={
              <Form/>
            }
          />
          <Route path="/help" element={<Help />}>
            <Route path="" element={<Introduction />} />
            <Route path="add" element={<Add />} />
            <Route path="remove" element={<Remove />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
