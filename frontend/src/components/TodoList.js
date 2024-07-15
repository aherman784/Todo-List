import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <ListGroup className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ListGroup>
  );
};

export default TodoList;
