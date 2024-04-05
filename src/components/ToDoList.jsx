import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const ToDoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [addItemEnabled, setAddITemEnabled] = useState(true);
  const [list, setList] = useState([]);

  const handleListItemInput = (e) => {
    e.preventDefault();
    setTodoInput(e.target.value);
  };

  const handleAddListItem = () => {
    const uuid = crypto.randomUUID();
    const date = new Date(Date.now());
    const listItem = {
      note: todoInput,
      uuid: uuid,
      created: date.toString(),
    };
    setList([...list, listItem]);
    setTodoInput("");
  };

  const handleDeleteItem = (id) => {
    setList(list.filter((item) => id !== item.uuid));
  };

  useEffect(() => {
    setAddITemEnabled(todoInput == "");
  }, [todoInput]);

  return (
    <div className="toDoList">
      <h1>Cygnus ToDo List</h1>
      <div className="addItem">
        <input
            onKeyDown={(e) => {
              if (e.key === "Enter")
                  handleAddListItem();
              }}
          autoFocus
          type="text"
          name="todoItem"
          id="toDoITem"
          onChange={handleListItemInput}
          value={todoInput}
        />
        <button onClick={handleAddListItem} disabled={addItemEnabled}>
          <FaPlus />
        </button>
      </div>
      <ul className="itemList">
        {list.map((item) => {
          new Date(item.created);
          return (
            <li key={item.uuid} className="listItem">
              <div>
                <p>Created: {item.created}</p>
                <p>Note: {item.note}</p>
                <p>ID: {item.uuid}</p>
              </div>
              <button onClick={() => handleDeleteItem(item.uuid)}>
                <FaTrashAlt />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
