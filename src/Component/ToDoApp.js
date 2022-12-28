import React, { useState, useEffect } from "react";
import AddToDoForm from "./AddToDoForm";
import ListView from "./ListView";
import { DBUrl } from "./DBUrl";
import "./ToDoApp.scss";

const ToDoApp = () => {
  const [toDoIncomplete, setTodoIncomplete] = useState("");

  const [toDoComplete, setTodoComplete] = useState("");

  const [tabs, setTabs] = useState("Incomplete");

  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch(DBUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error("Failed to Fetch Data!");
        } else {
          //disable error message
          setError(null);

          return response.json();
        }
      })
      .then((data) => {
        //Filter Incomplete To Do List
        const resultIncomplete = data.filter((item) => item.status == "incomplete");
        setTodoIncomplete(resultIncomplete);

        //Filter Completed To Do List
        const resultComplete = data.filter((item) => item.status == "complete");
        setTodoComplete(resultComplete);
        console.log(resultComplete);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 class="title">Simply To Do List App</h1>
      <AddToDoForm fetchData={fetchData} />
      <div class="list-container">
        <div class="tab-container">
          <button class={`incomplete-btn ${tabs === "Incomplete" ? "active" : ""}`} onClick={() => setTabs("Incomplete")}>
            Incomplete
          </button>
          <button class={`complete-btn ${tabs === "Complete" ? "active" : ""}`} onClick={() => setTabs("Complete")}>
            Completed
          </button>
        </div>
        {/* Error Message */}
        {error && <p class="message">Failed to Fetch Data!</p>}
        {/* Incomplete Tab */}
        {tabs == "Incomplete" && toDoIncomplete && !error && <ListView toDoListData={toDoIncomplete} fetchData={fetchData} />}
        {/* Empty Incomplete Tab */}
        {tabs == "Incomplete" && toDoIncomplete == 0 && !error && <p class="message">Please Enter Task!</p>}
        {/* Complete Tab */}
        {tabs == "Complete" && toDoComplete && !error && <ListView toDoListData={toDoComplete} fetchData={fetchData} />}
        {/* Empty Complete Tab */}
        {tabs == "Complete" && toDoComplete == 0 && !error && <p class="message">No Completed Task!</p>}
      </div>
    </div>
  );
};

export default ToDoApp;
