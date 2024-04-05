import React, { useEffect, useState, useRef } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaCheck,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";

const makeFileDateTime = (ms) => {
  const dateObj = new Date(ms);
  let dateStamp = "";
  dateStamp += dateObj.getFullYear().toString();
  dateStamp += (dateObj.getMonth() + 1).toString().padStart(2, "0");
  dateStamp += (dateObj.getDay() + 1).toString().padStart(2, "0");
  dateStamp += "_";
  dateStamp += dateObj.getHours().toString().padStart(2, "0");
  dateStamp += dateObj.getMinutes().toString().padStart(2, "0");
  dateStamp += dateObj.getSeconds().toString().padStart(2, "0");
  return dateStamp;
};

const exportJSON = async (
  toDoData,
  filename = `${makeFileDateTime(Date.now())}-todolist.json`
) => {
  const data = {
    version: "1.0.0",
    timestamp: Date.now(),
    data: toDoData,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.addEventListener("click", (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};

const ToDoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [addItemEnabled, setAddITemEnabled] = useState(true);
  const [list, setList] = useState([]);

  const inputRef = useRef();

  const handleListItemInput = (e) => {
    e.preventDefault();
    setTodoInput(e.target.value);
  };

  const handleAddListItem = () => {
    if (todoInput === "") return;
    const timestamp = Date.now();
    const listItem = {
      note: todoInput,
      uuid: crypto.randomUUID(),
      created: timestamp,
      complete: false,
      dueDate: timestamp + 86400000,
    };
    setList([...list, listItem]);
    setTodoInput("");
    inputRef.current.focus();
  };

  const handleDeleteItem = (id) => {
    setList(list.filter((item) => id !== item.uuid));
  };

  const handleMarkComplete = (id, complete) => {
    setList(
      list.map((item) => {
        if (item.uuid === id) {
          return { ...item, complete };
        } else {
          return item;
        }
      })
    );
  };
  const handleFileExportJSON = () => {
    exportJSON(list);
  };

  useEffect(() => {
    setAddITemEnabled(todoInput == "");
  }, [todoInput]);

  return (
    <div className="toDoList">
      <h1>Cygnus ToDo List</h1>
      <div className="addItem">
        <input
          id="toDoITem"
          name="todoItem"
          type="text"
          autoFocus
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddListItem();
          }}
          onChange={handleListItemInput}
          value={todoInput}
        />
        <button onClick={handleAddListItem} disabled={addItemEnabled}>
          <FaPlus />
        </button>
        <button onClick={() => handleFileExportJSON()} tooltip="Export">
          <FaFileExport />
        </button>
        {/* <input
          type="file"
          className="hidden"
          multiple={false}
          accept=".json,application/json"
          onChange={(evt) => this.openFile(evt)}
        /> */}
        {/* <button onClick={() => handleFileImportJSON()}>
          <FaFileImport />
        </button> */}
      </div>
      <ul className="itemList">
        {list.map((item) => {
          // new Date(item.created);
          return (
            <li key={item.uuid} className="listItem">
              <div>
                <p>Created: {new Date(item.created).toLocaleString()}</p>
                <p>Due: {new Date(item.dueDate).toLocaleString()}</p>
                <p>Note: {item.note}</p>
                <p>Complete: {item.complete ? "Yes" : "No"}</p>
                <p>ID: {item.uuid}</p>
              </div>
              <div>
                <button onClick={() => handleDeleteItem(item.uuid)}>
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleMarkComplete(item.uuid, !item.complete)}
                >
                  <FaCheck />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
