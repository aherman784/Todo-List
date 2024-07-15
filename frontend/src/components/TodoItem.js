import React, { useState } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./TodoItem.css";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggleComplete = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodo = { ...todo, title: editedTitle, description: editedDescription };
    updateTodo(updatedTodo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  return (
    <ListGroup.Item className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <Form.Check 
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="todo-checkbox"
      />
      {isEditing ? (
        <div className="todo-edit-form">
          <Form.Control
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="todo-edit-title"
          />
          <Form.Control
            as="textarea"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="todo-edit-description"
          />
          <Button variant="success" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="todo-info">
          <h5 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </h5>
          <p className="todo-description">{todo.description}</p>
        </div>
      )}
      {!isEditing && (
        <div className="todo-buttons">
          <button className="icon-button edit-button" onClick={handleEdit}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="icon-button delete-button" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default TodoItem;
