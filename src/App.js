import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  let characterRef = useRef(null);

  const [linkUrl] = useState("https://assets.breatheco.de/apis/fake/todos/user/lucas-vy");
  const [todo, setTodo] = useState([]);
  const [assignment, setAssignment] = useState([
    { label: "Make the bed", done: false },
    { label: "Walk the dog", done: false },
    { label: "Do the replits", done: false },
  ]);

  useEffect(() => {
    getassignment(linkUrl)},[linkUrl]);

  //get
  const getassignment = linkUrl => {
    fetch(linkUrl)
      .then(Response => Response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

    // POST
    const getUser = linkUrl => {
      fetch(linkUrl, {
        method: 'POST',
        body: JSON.stringify([]),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(Response => Response.json())
        .then(data => console.log(data.result))
        .catch(error => console.log(error));
      console.warn('New Usuario')
    };

    //PUT
    const updateassignment = (linkUrl, assignment) => {

      fetch(linkUrl, {
        method: 'PUT',
        body: JSON.stringify(assignment),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

     //DELETE
  const deleteUser = (linkUrl) => {
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


/*       */

  const addAssignment = (e) => {
    if (e.key === 100 && characterRef.value !== "") {
      setTodo(todo.concat(characterRef.value));
      let newassignments = [...assignment, { label: e.target.value, done: false }]
      setAssignment(newassignments)
      updateassignment(linkUrl, newassignments)
      characterRef.value = "";
    }
  }

  const addAssignmentB = () => {
    if (characterRef.value !== "") {
      setTodo(todo.concat(characterRef.value));
      characterRef.value = "";
    }
  }

  const deleteAssignment = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
    assignment.splice(index, 1)
    setAssignment([...assignment])

    updateassignment(linkUrl, assignment)
  }

 
  const deleteAllassignments = () => {
    setTodo([])
    setAssignment([])
    deleteUser(linkUrl)
    console.warn('User deleted')
  }

  return (
    <>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body" >
            <h1 className="card-title text-center">To-Do List</h1>
            <ol className="list-group list-group">
              <div className="input-group mb-3 list-group list-group">
                <input onKeyUp={addAssignment} ref={r => characterRef = r} type="text" id="input" className="list-group-item" placeholder="Add a new your assignment!" />
                <div className="input-group-append list-group list-group">
                  <button onClick={() => getUser(linkUrl)} className="btn btn-primary" type="button" id="button">New User</button>
                  <button onClick={addAssignmentB} className="btn btn-sm btn-success" type="button" id="button">Add</button>
                </div>
              </div>
              {
                !!todo.length > 0 && todo.map((todo, index) => {
                  return (
                    <li className="list-group-item py-1" key={index}>{todo}
                      <i className="fas fa-trash-alt float-right btn btn-danger" id="delete"
                        onClick={() => deleteAssignment(index)}></i></li>
                  )
                })
              }
            </ol>
          </div>
          <div className="card-footer">
            <strong> Current Nº of To-Do's: {todo.length}</strong>
            <button className="btn btn-sm float-right btn-danger" id="deleteAll" onClick={deleteAllassignments}><i className="fas fa-eraser"> Eraise All</i></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
