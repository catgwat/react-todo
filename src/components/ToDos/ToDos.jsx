import { useState, useEffect } from "react"
import axios from "axios"
import FilterCat from "./FilterCat"
import SingleToDo from "./SingleToDo"
import {useAuth} from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'
import "./ToDos.css"

export default function ToDos() {
  const [todos, setTodos] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const {currentUser} = useAuth()

  const [filter, setFilter] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  const getTodos = () => {
    axios.get(`http://todoapi.catiewatsondev.com/api/todos`).then(response => {
      setTodos(response.data)
    })
  }
  useEffect(() => {
    getTodos()
  }, [])

  return (
    <section className="todos">
      <article className="bg-warning p-5">
        <h1 className="text-center">To Do Dashboard</h1>
      </article>
      {/* BEGIN CREATE UI */}
      {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
            <button onClick={() => setShowCreate(!showCreate)} className="btn btn-success">
                {!showCreate ? 'Create New To Do' : 'Close Form'}
            </button>
            <div className="createContainer">
                {showCreate &&
                    <ToDoCreate getTodos={getTodos} setShowCreate={setShowCreate} />
                }
            </div>
        </div>
      }
      {/* END CREATE UI */}
      <FilterCat setFilter={setFilter} setShowComplete={setShowComplete} />
      <div className="container p-2">
        
        <table className="table bg-light table-dark table-striped my-3">
          <thead className="table-light text-uppercase">
            <tr>
              <th>Check</th>
              <th>Task</th>
              <th>Category</th>
              {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
              <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
          {!showComplete ?
            <>
              {filter === 0 ? todos.filter(d => d.done === false).map(d => 
              <SingleToDo key={d.toDoId} todo={d} getTodos={getTodos}/>
              ) :
              todos.filter(d => d.done === false && d.categoryId === filter).map(d =>
              <SingleToDo key={d.toDoId} todo={d} getTodos={getTodos} />
            )}
            </> :
            <>
              {filter === 0 ? todos.map(t =>
                  <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos} />
                ) : 
                todos.filter(t => t.categoryId === filter).map(t =>
                  <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos}/>
              )}
            </>
            } 
          </tbody>
        </table>
          {!showComplete ?
            <>
              {filter !== 0 && todos.filter(d => d.done === false && d.categoryId === filter).length ===0 &&
                <h2 className="alert alert-warning text-dark">
                    There are no incomplete Tasks in this category.
                </h2>
              }
            </> :
            <>
              {filter !== 0 && todos.filter(t => t.categoryId === filter).length === 0 &&
                  <h2 className="alert alert-warning text-dark">
                    There are no results for this category.
                  </h2>
              }
            </>
          }
      </div>
    </section>
  )
}