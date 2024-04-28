import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import CatEdit from "./CatEdit"
import axios from "axios"

export default function SingleCategory({category, getCategories}) {
    const {categoryName, categoryDescription, categoryId} = category
    const {currentUser} = useAuth()
    const [showEdit, setShowEdit] = useState(false)
    const [todos, setTodos] = useState([])

    const deleteCat = (id) => {
      //we wait for confirmation from the user before making our delete request
      //if the user clicks "cancel", this scope will be skipped
      if(window.confirm(`Are you sure you want to delete ${categoryName}`)){
        //if the user wants to delete, grab the resources from the API:
        axios.get(`http://todoapi.catiewatsondev.com/api/todos`).then(r => {
          setTodos(r.data)
        })
        const filteredTodos = todos.filter(r => r.categoryId === id)
        
        if(filteredTodos.length > 0){
          
          window.alert(`Error! Cannot delete the category ${categoryName} because it contains the following to dos: 
          ${filteredTodos.map(r => `\n${r.name}`)}
          \nPlease delete these to dos or reassign them to a different category before deleting ${categoryName}.`)
        }else{
          axios.delete(`http://todoapi.catiewatsondev.com/api/categories/${id}`).then(getCategories)
        }
      }
    }

  return (
    <tr>
        <td>{categoryName}</td>
        <td>{categoryDescription}</td>
        {/* BEGIN EDIT UI */}
        {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
          <td>
            <button onClick={() => setShowEdit(true)} id='editLink' className="m-1 rounded">
              <FaEdit />
            </button>
            <button onClick={() => deleteCat(categoryId)} id='deleteLink' className="m-1 rounded">
              <FaTrashAlt />
            </button>
            {showEdit &&
              <CatEdit
              setShowEdit={setShowEdit}//tied to closing the modal in CatEdit
              showEdit={showEdit}//tied to showing the modal (if true, modal is shown)
              getCategories={getCategories}//allows us to refresh the table in Categories.jsx
              category={category} />
            }
          </td>
        }
        {/* END EDIT UI */}
    </tr>
    )
}