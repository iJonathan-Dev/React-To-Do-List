import React, { useState } from "react";
import { DBUrl } from "./DBUrl";

const AddToDoForm = ({ fetchData }) => {
  const [newToDoListValue, setNewTodoListValue] = useState("");

  const addToDo = (e, newToDoListValue) => {
    e.preventDefault();

    const toDo = { title: newToDoListValue, status: "incomplete" };

    fetch(DBUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toDo),
    }).then(() => fetchData());
  };

  return (
    <div class="form-container">
      <form onSubmit={(e) => addToDo(e, newToDoListValue)}>
        <label htmlFor="ToDo-List">Add To Do List</label>
        <input type="text" id="ToDo-List" placeholder="Type here..." value={newToDoListValue} onChange={(e) => setNewTodoListValue(e.target.value)} required />
        <button id="add-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddToDoForm;
