import React, {useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ todos, setTodos ] = useState([]);

  const addTodo = (e) => {
    e.preventDefault()

    let todo_text = document.getElementById('addTodo').value;
    todo_text = todo_text.trim()
    if (todo_text.length > 0) {
      let newTodo = {
        id: new Date().getTime(),
        text: todo_text,
      }
      setTodos([...todos].concat(newTodo))
    } else {
      alert("Please enter a valid task!")
    }
  }

  return (
    <div id='todo-list'>
      <h1>Todo List</h1>
      <form onSubmit={ addTodo }>
        <input type='text' id='addTodo' />
        <button type='submit'>Add Todo</button>
      </form>

    {todos.map((todo) => 
      <div className='todo' key={todo.id}>
        <div className='todo-text'>
          <div>{todo.text}</div>
        </div>
      </div>
    )}
    </div>
  );
}

export default App;
