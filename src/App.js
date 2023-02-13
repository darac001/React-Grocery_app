import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const uniqueId = parseInt(Date.now() * Math.random());
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  // console.log(name);
  // console.log(list);

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };
  const removeItem = (id) => {
    let newList = list.filter((item) => item.id !== id);
    showAlert(true, "success", "Item removed");
    setList(newList);
  };
  const removeAll = () => {
    showAlert(true, "success", "list emptied");
    setList([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display danger alert
      showAlert(true, "danger", "please enter item");
    } else {
      // display success alert
      showAlert(true, "success", "itemd added to the list");
      // add new item to the list
      const newItem = {
        id: uniqueId,
        title: name,
      };
      setList([...list, newItem]);
      // clear the input box
      setName("");
    }
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <section className="section-center">
      <div className="grocery-form">
        <div className="grocery-section-title">
          <h1>Grocery List</h1>
        </div>
        <Form onSubmit={handleSubmit} className="form">
          {/* show alert only if true, add useffect to Alert component with settimeout function to remove the alert */}
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <Form.Group className="mb-3 input-box">
            <Form.Control
              type="text"
              placeholder="e.g. Milk, Eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="primary" type="submit" id="submit-btn">
              Add item
            </Button>
          </Form.Group>
        </Form>
      </div>
      {/* show only if items in the list */}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />

          <div className="grocery-section">
            <Button
              variant="primary"
              type="submit"
              id="delete-btn"
              onClick={() => removeAll()}
            >
              Delete all
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
