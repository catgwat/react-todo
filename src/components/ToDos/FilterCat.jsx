import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterCat({setFilter, showComplete, setShowComplete}) {
    const[categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`http://todoapi.catiewatsondev.com/api/categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);

  return (
    <div className="text-center mt-5">
        <button className="btn btn-outline-warning bg-dark m-1" onClick={() => setFilter(0)}>
            All
        </button>
        {categories.map(c =>
        <button key={c.categoryId} onClick={() => setFilter(c.categoryId)}
         className="btn btn-outline-warning bg-dark m-1">
            {c.categoryName}
        </button> 
        )}
        
        {!showComplete ?
            <button className="btn btn-primary m-1" onClick={() => setShowComplete(!showComplete)}>Show Complete</button> :
            <button className="btn btn-danger m-1" onClick={() => setShowComplete(!showComplete)}>Hide Complete</button>
        }

    </div>
  )
}