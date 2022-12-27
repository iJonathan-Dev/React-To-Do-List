import React, { useState, useEffect } from "react";
import AddToDoForm from "./AddToDoForm";
import ListView from "./ListView";
import { DBUrl } from "./DBUrl";

const ToDoApp = () => {
  const [toDoListData, setTodoListData] = useState("");
  const [toDoIncomplete, setTodoIncomplete] = useState("");

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
        //Filter Incomplete Data
        const result = data.filter((item) => item.status == "incomplete");

        setTodoListData(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <AddToDoForm fetchData={fetchData} />
      {toDoListData && <ListView toDoListData={toDoListData} fetchData={fetchData} />}
      <button class={tabs === "Incomplete" ? "active" : ""} onClick={() => setTabs("Incomplete")}>
        Incomplete
      </button>
      <button class={tabs === "complete" ? "active" : ""} onClick={() => setTabs("Complete")}>
        Complete
      </button>
      {/* Error Message */}
      {error && <p>Failed to Fetch Data!</p>}
      {/* Incomplete Tab */}
      {tabs == "Incomplete" && toDoIncomplete && !error && <ListView toDoListData={toDoIncomplete} fetchData={fetchData} />}
      {/* Empty Incomplete Tab */}
      {tabs == "Incomplete" && toDoIncomplete == 0 && !error && <p>Please Enter Task!</p>}
      {/* Complete Tab */}
      {tabs == "Complete" && toDoComplete && !error && <ListView toDoListData={toDoComplete} fetchData={fetchData} />}
      {/* Empty Complete Tab */}
      {tabs == "Complete" && toDoComplete == 0 && !error && <p>No Completed Task!</p>}
    </div>
  );
};

export default ToDoApp;
