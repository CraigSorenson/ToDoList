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
  // loading localstorage from a useEffect with empty dependency array would not work. Had to do it here
  const [list, setList] = useState(JSON.parse(localStorage.getItem("toDoList")) ?? []);

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
    localStorage.setItem("toDoList", JSON.stringify(list));
  }, [list])

  useEffect(() => {
    setAddItemEnabled(todoInput == "");
  }, [todoInput]);

  // useEffect(() => {
  //   const storedList = JSON.parse(localStorage.getItem('toDoList'));
  //   if (storedList) {
  //     setList(storedList);
  //   }
  // }, [])

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
          <FaPlus className="icon" />
        </button>
        <button onClick={() => handleFileExportJSON()}>
          <FaFileExport className="icon" />
        </button>
        <FileInput callback={setList} />
      </div>
      <div className="itemList">
        {list.map((item) => {
          return (
            <div key={item.uuid} className="listItem">
              <div className="card">
                {/* <p>ID: {item.uuid}</p> */}
                <div className="dates">
                  <p>Created: {new Date(item.created).toLocaleString()}</p>
                  <p>Due: {new Date(item.dueDate).toLocaleString()}</p>
                </div>
                <p className="note">{item.note}</p>
                <div className="cardButtons">
                  <button onClick={() => handleDeleteItem(item.uuid)}>
                    <FaTrashAlt className="icon" />
                  </button>
                  <p className={item.complete ? "complete" : "incomplete"}>
                    Complete: {item.complete ? "Yes" : "No"}
                  </p>
                  <button
                    onClick={() =>
                      handleMarkComplete(item.uuid, !item.complete)
                    }
                  >
                    <FaCheck className="icon" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoList;
