import ToDoForm from "./ToDoForm"

export default function ResourceCreate({setShowCreate, getTodos}) {
    return (
        <article className="createResource m-2 text-white justify-content-center">
            <ToDoForm setShowCreate={setShowCreate} getTodos={getTodos} />
        </article>  
    )
}