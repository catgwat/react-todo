import Modal from 'react-bootstrap/Modal'
import ToDoForm from './ToDoForm'

export default function ToDoEdit({todo, showEdit, setShowEdit, getTodos}) {
  const {name} = todo
  
  return (
    <Modal 
    show={showEdit}
    onHide={() => setShowEdit(false)}
    size='lg' >
      <Modal.Header closeButton>
        <h2>Editing {name}</h2>
      </Modal.Header>
      <Modal.Body>
        <ToDoForm setShowEdit={setShowEdit}
        getTodos={getTodos}
        todo={todo} />
      </Modal.Body>
    </Modal>
  )
}