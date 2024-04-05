import React, { useEffect, useState, useRef } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaCheck,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { exportJSON, FileInput } from "../utility/Utility";

const ToDoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [addItemEnabled, setAddItemEnabled] = useState(true);
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
      uuid: uuid(),
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
    setAddItemEnabled(todoInput == "");
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
        <button onClick={() => handleFileExportJSON()}>
          <FaFileExport />
        </button>
        <FileInput callback={setList} />
      </div>
      <ul className="itemList">
        {list.map((item) => {
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
