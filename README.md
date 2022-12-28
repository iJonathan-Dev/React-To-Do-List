# Simply To Do List App

The Simply To Do List App is built using React JS. This app provide simple to use To Do List app.

Simply input the task then it will be displayed under "Incomplete" Tabs. Task can be deleted or mark as 'completed' by selecting the relevant button. Once task is marked as 'Completed', it will be displayed on the 'Completed' Tabs.

On the 'Completed' Tabs a task can be deleted for good or mark as 'Incomplete' to put it back to "Incomplete" Tabs

**Technology used:**  
-React JS  
-API: Local JSON Database  
-Sass Styling

**Installation**

1. Fork this project.
2. cd into the new folder and type  
   `npm install`
3. Start json server (this app using port 3001, other port can be used as preffered)  
   `npx json-server --watch Database/ToDoListDB.json --port 3001`
4. Make sure the Database URL is set correctly on DBUrl.js  
   eg. `http://localhost:3001/ToDo/`
5. To run Project  
   `npm start`
