import React, { useEffect, useRef, useState } from 'react';
import './App.css';


function App() {

  let nameRef = useRef(null);
  const [linkUrl] = useState("https://assets.breatheco.de/apis/fake/todos/user/Lucas-VY");


  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState([]);


  useEffect(() => {
    getTask(linkUrl)
  }, [linkUrl]);

//GET 
  const getTask = linkUrl => {
    fetch(linkUrl)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

//POST
  const getUser = linkUrl => {
    fetch(linkUrl, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data.result))
      .catch(error => console.log(error));
      console.log('post funciona')
  };

// PUT 
  const updateTask = (linkUrl, task) => {
    fetch(linkUrl, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    console.log('Se Actualiza')
  }


  const deleteUser = () => {
    fetch(linkUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }


  const AddTodo = (e) => {
    if (e.keyCode === 13 && nameRef.value !== "") {
      setTodo(todo.concat(nameRef.value));
      let newTasks = [...task, { label: nameRef.value, done: false }]
      setTask(newTasks)
      updateTask(linkUrl, newTasks)
      nameRef.value = "";
    }
  }

  const AddTodoB = () => {
    if (nameRef.value !== "") {
      setTodo(todo.concat(nameRef.value));
      nameRef.value = "";
    }
  }


  const deleteTodo = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
    task.splice(index,1)
    setTask([...task])
    updateTask(linkUrl,task)
  }


  const deleteAll = () => {
    setTodo([]);
    setTask([])
    deleteUser(linkUrl);
    console.log('delete funciona');
  }


  return (
    <>
      <div className="container">
      <div className="card mt-5">
        <div className="card-body" >
          <h1 className="card-title text-center">To-Do List</h1>
          <ol className="list-group list-group">
            <div className="input-group mb-3 list-group list-group">
              <input onKeyUp={AddTodo} ref={r => nameRef = r} type="text" id="input" className="list-group-item" placeholder="Add a new your Task!" />
              <div className="input-group-append list-group list-group">
                <button onClick={() => getUser(linkUrl)} className="btn btn-primary" type="button" id="button">New User</button>
                <button onClick={AddTodoB} className="btn btn-sm btn-success" type="button" id="button">Add</button>
              </div>
            </div>
            {
              !!todo.length > 0 && todo.map((todo, index) => {
                return (
                  <li className="list-group-item py-1" key={index}>{todo}
                    <i className="fas fa-trash-alt float-right btn btn-danger" id="delete"
                      onClick={() => deleteTodo(index)}></i></li>
                )
              })
            }
          </ol>
        </div>
        <div className="card-footer">
          <strong> Current Nº of To-Do's: {todo.length}</strong>
          <button className="btn btn-sm float-right btn-danger" id="deleteAll" onClick={deleteAll}><i className="fas fa-eraser"> Eraise All</i></button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
