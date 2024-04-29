import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);

  const addTodo = (e) => {
    console.log(todos)
    e.preventDefault()

    let todo_text = document.getElementById('addTodo').value;
    todo_text = todo_text.trim()
    if (todo_text.length > 0) {
      let newTodo = {
        id: new Date().getTime(),
        text: todo_text,
        isCompleted: false,
      }
      setTodos([...todos].concat(newTodo))
    } else {
      alert("Please enter a valid task!")
    }
  }

  const deleteTodo = (id) => {
    console.log("delete called")
    let updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const editTodo = (newTodo) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    })
    setTodos(updatedTodos)
    setEdit(null);
  }

  const deleteAll = () => {
    setTodos([])
  }

  return (
    <div id='todo-list'>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input type='text' id='addTodo' />
        <button type='submit'>Add Todo</button>
      </form>

      {todos.map((todo) =>
        <div className='todo' key={todo.id}>
          <input type='checkbox' id="complete-checkbox" checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)} />
          <div className='todo-text'>
            {todo.id === edit ?
              (<input type='text' id={todo.id} defaultValue={todo.text} />
              ) :
              (<div>{todo.text}</div>)
            }
          </div>
          <div className='todo-action'>
            {todo.id === edit ?
              (<button onClick={() => editTodo(todo)}>Submit Edit</button>
              ) :
              (<button onClick={() => setEdit(todo.id)}>Edit Todo</button>
              )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      )}
      <button onClick={() => deleteAll()}>Delete All Todos</button>
    </div>
  );
}

export default App;
