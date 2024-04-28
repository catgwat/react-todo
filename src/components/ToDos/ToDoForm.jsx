import { useState, useEffect } from "react"
import {Formik, Field, Form} from 'formik'
import { todoSchema } from "../../utilities/validationSchema"
import axios from 'axios'


export default function ToDoForm({todo = '', getTodos, setShowCreate, setShowEdit}) {
    const { toDoId, name, done, categoryId } = todo || ''
    //we get the categories form our API to populate a select list for categoryId in the form
    const [categories, setCategories] = useState([]);

    

    useEffect(() => {
        axios.get(`http://todoapi.catiewatsondev.com/api/categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);

    const handleSubmit = (values) => {
        console.log(values)
        if(!todo){
            //in these scopes, no resource in the props triggers Create mode
            //make a temp object from the values in the form
            const todoToCreate = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            }

            //make the POST request with Axios
            axios.post(`http://todoapi.catiewatsondev.com/api/todos`, todoToCreate).then(() => {
                setShowCreate(false)//close the Create form in Resources
                getTodos()//update the tiles in Resources
            })
        }
        else{
            const todoToEdit = {
                toDoId: toDoId,
                name: values.name,
                done: done,
                categoryId: values.categoryId
            }

            axios.put(`http://todoapi.catiewatsondev.com/api/todos/${toDoId}`, todoToEdit).then(() => {
                setShowEdit(false)
                getTodos()
            })
        }
    }

  return (
    <Formik
    initialValues={{
        name: todo ? name : '',
        categoryId: todo ? categoryId : ''
    }}
    validationSchema={todoSchema}
    onSubmit={(values) => handleSubmit(values)}>
    {/* for simplicity, start with the below structure and add the Form to the empty parens
    {({errors, touched}) => ()} */}
    {({errors, touched}) => (
        <Form id='todoForm'>
            <div className="form-group m-3">
                <Field name='name' className='form-control' placeholder='Name' />
                {errors.name && touched.name && <div className="text-danger">{errors.name}</div> }
            </div>
            <div className="form-group m-3">
                <Field as='select' name='categoryId' className='form-control'>
                    <option value='' disabled>
                        [--Please Choose--]
                    </option>
                    {/* Below we map an option for each category in our database */}
                    {categories.map(cat =>
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                        </option>
                    )}
                </Field>
            </div>
            <div className="form-group m-3">
                <button type='submit' className="btn btn-success m-3">
                    Submit To Do to API
                </button>
            </div>
        </Form>
    )}
    </Formik>
  )
}