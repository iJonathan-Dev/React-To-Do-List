import React from "react";
import { DBUrl } from "./DBUrl";
import "./ListView.scss";

const ListView = ({ toDoListData, fetchData }) => {
  //Delete Task Function
  const handleDelete = (id) => {
    fetch(DBUrl + id, {
      method: "DELETE",
    }).then(() => fetchData());
  };

  //Complete Task Function
  const handleComplete = (id) => {
    fetch(DBUrl + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "complete" }),
    }).then(() => fetchData());
  };

  //Mark Task Incomplete
  const handleIncomplete = (id) => {
    fetch(DBUrl + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "incomplete" }),
    }).then(() => fetchData());
  };

  return (
    <div class="list-view-group">
      {toDoListData.map((data) => (
        <div class="list-view-container" key={data.id}>
          <div class="list-name-container">
            <p class="list-name">{data.title}</p>
          </div>
          <div class="btn-container">
            <img src="https://img.icons8.com/color/48/null/cancel--v1.png" id="delete-btn" alt="Delete" onClick={() => handleDelete(data.id)} />
          </div>
          {data.status == "incomplete" && (
            <div class="btn-container">
              <img src="https://img.icons8.com/color/48/null/ok--v1.png" id="complete-btn" alt="Complete" onClick={() => handleComplete(data.id)} />
            </div>
          )}
          {data.status == "complete" && (
            <div class="incomplete-btn-container">
              <button id="incomplete-btn" onClick={() => handleIncomplete(data.id)}>
                Incomplete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListView;
