import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Use the todo_list endpoint to fetch all todos from database
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://3.147.56.208:8000/api/todos/");
      console.log("Fetching todos...");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Use the todo_list endpoint to add a new todo to the database
  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        "http://3.147.56.208:8000/api/todos/",
        newTodo
      );
      console.log("Added todo:", response.data);
      setTodos([...todos, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Use the todo_detail endpoint to update a todo in the database
  const updateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://3.147.56.208:8000/api/todos/${updatedTodo.id}/`,
        updatedTodo
      );
      console.log("Updated todo:", response.data);
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Use the todo_detail endpoint to delete a todo from the database
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://3.147.56.208:8000/api/todos/${id}/`);
      console.log("Deleted todo with id:", id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <Container className="app-container">
      <div className="border-container">
        <h1 className="todo-header">Todo List</h1>
        <Button className="toggle-form-button" onClick={toggleFormVisibility}>
          <i className={showForm ? "fas fa-minus" : "fas fa-plus"}></i>
        </Button>
        {showForm && <TodoForm addTodo={addTodo} />}
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </Container>
  );
};

export default App;
