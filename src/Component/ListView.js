import React from "react";
import { DBUrl } from "./DBUrl";

const ListView = ({ toDoListData, fetchData }) => {
  const handleDelete = (id) => {
    fetch(DBUrl + id, {
      method: "DELETE",
    }).then(() => fetchData());
  };

  const handleComplete = (id) => {
    fetch(DBUrl + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "complete" }),
    }).then(() => fetchData());
  };

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
          <div class="delete-btn-container">
            <button id="delete-btn" onClick={() => handleDelete(data.id)}>
              Delete
            </button>
          </div>
          {data.status == "incomplete" && (
            <div class="complete-btn-container">
              <button id="complete-btn" onClick={() => handleComplete(data.id)}>
                Complete
              </button>
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
