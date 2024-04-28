import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { FaEdit, FaTrashAlt} from 'react-icons/fa'
import axios from "axios"
import ToDoEdit from "./ToDoEdit"

export default function SingleToDo({todo, getTodos}) {
    const{toDoId, name, done, category, categoryId} = todo
    const [showEdit, setShowEdit] = useState(false)

    const {currentUser} = useAuth()

    const handleDone = () => {
      console.log(`done: ${done} !done: ${!done}}`)
      let updatedTodo = {
        toDoId: toDoId,
        name: name,
        done: !done,
        categoryId: categoryId
      }
      axios.put(`http://todoapi.catiewatsondev.com/api/todos/${toDoId}`, updatedTodo).then(response => {
        console.log(response)
        getTodos()
      })
    }

    const deleteTodo = (id) => {
      if(window.confirm(`Are you sure you want to delete ${name}?`)){
        axios.delete(`http://todoapi.catiewatsondev.com/api/todos/${id}`).then(() => {getTodos()})
      }
    }

  return (
    <tr>
        <td><input type="checkbox" checked={done} onChange={() => handleDone()}/></td>
        <td>{name}</td>
        <td>{category.categoryName}</td>
        {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
          <td className="text-center">
            <button className="fs-5 rounded" id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className="fs-5 rounded" id='deleteLink' onClick={() => deleteTodo(toDoId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <ToDoEdit 
              showEdit={showEdit} 
              setShowEdit={setShowEdit}
              todo={todo}
              getTodos={getTodos}
              />
              }
          </td>
        }
    </tr>
  )
}