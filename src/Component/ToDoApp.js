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
    </div>
  );
};

export default ToDoApp;
