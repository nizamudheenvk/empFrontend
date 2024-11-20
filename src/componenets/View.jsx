import React, { useEffect, useState } from 'react'
import { deleteEmpApi, EditEmpApi, getAllEmpApi } from './services/Allapi'
import { Modal,FloatingLabel,Form,Button} from 'react-bootstrap'



const View = ({setAddresponseFromApp}) => {
  const [editEmployee,setEditEmployee]=useState([])
  // console.log(editEmployee);
  
  const [allEmployees,setallEmployees]=useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    getAllEmployees()
  },[setAddresponseFromApp,allEmployees])
  // console.log(allEmployees);
  
  const getAllEmployees = async()=>{
    try{
      const result = await getAllEmpApi()
      // console.log(result);
      if(result.status>=200 && result.status<300){
        setallEmployees(result.data);  
      }
    }catch(err){
      console.log(err);
      
    }
  }
  const removeEmployee = async (id)=>{
try{
  await deleteEmpApi(id)
  getAllEmployees()
}catch(err){
  console.log(err);
}
  }

  const handleEdit = (EmployeeDetails)=>{
    setEditEmployee(EmployeeDetails)
    setShow(true)
    
  }

  const updateEmployees = async()=>{
    try{
      const result =await  EditEmpApi(editEmployee)
      console.log(result);
      if(result.status>=200 && result.status<300){
        getAllEmpApi()
        setShow(false)
      }
      
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div>
        <table className='container w-100 my-5 table'>
            <thead >
                <tr>
                <th>id</th>
                <th>username</th>
                <th>Email</th>
                <th>status</th>
                </tr>
            </thead>
            <tbody>
              {
               allEmployees?.length>0 ?
               allEmployees?.map(emp=>(
                <tr key={emp?.id}>
                <td>{emp?.id}</td>
                <td>{emp?.username}</td>
                <td>{emp?.email}</td>
                <td>{emp?.status}</td>
                <button onClick={()=>handleEdit(emp)} className='m-2'>Edit</button> 
                <button onClick={()=>removeEmployee(emp?.id)}><i className='fa-solid fa-trash text-danger'></i></button>
                </tr>
               ))
               :
               <div className='fw-bolder text-danger'>Employees not Added</div> 

              }
                </tbody>
                
        </table>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='border rounded'>
      <FloatingLabel className='mt-2' controlId="floatingCaption" label="username">
        <Form.Control value={editEmployee?.username} onChange={e=>setEditEmployee({...editEmployee,username:e.target.value})} type="text" placeholder="username" />
      </FloatingLabel>
      <FloatingLabel className='mt-2' controlId="floatingCaption" label="email">
        <Form.Control value={editEmployee?.email} onChange={e=>setEditEmployee({...editEmployee,email:e.target.value})}  type="text" placeholder="email" />
      </FloatingLabel>
      <FloatingLabel className='mt-2' controlId="floatingCaption" label="status">
      <Form.Select value={editEmployee?.status} onChange={e=>setEditEmployee({...editEmployee,status:e.target.value})}  aria-label="Default select example">
      <option>select status</option>
      <option value="active">active</option>
      <option value="inactive">inactive</option>
    </Form.Select>
    </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={updateEmployees} variant="primary">update</Button>
        </Modal.Footer>
      </Modal>

        
    </div>
  )
}

export default View