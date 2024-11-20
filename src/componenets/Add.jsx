import React, { useState } from 'react'
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap'
import { saveEmpAPI } from './services/Allapi';


const Add = ({setAddresponseFromApp}) => {

    const [EmployeeDetails,setEmployeeDetails] = useState({
        username:"",email:"",status:""
      })
      console.log(EmployeeDetails);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleuploadEmployees = async()=>{
        const {username,email,status} = EmployeeDetails
        if(username && email && status){
            try{
                const result = await saveEmpAPI(EmployeeDetails)
                console.log(result);
                if(result.status>=200 && result.status<300){
                    handleClose()
                setAddresponseFromApp(result.data)

                }else{
                    console.log(result);
                }
            }catch(err){
                console.log(err);
            }
        }else{
            alert("please fill the form")
        }
      }
  return (
    <div style={{backgroundColor:"grey",width:"100%",height:"40vh"}}>
        <h1 style={{marginLeft:"550px"}}>Employee Management</h1>
      <h3 style={{marginLeft:"600px",color:"white"}}>Add employees</h3>
        <div style={{fontSize:"40px"}}>
            <button onClick={handleShow} style={{fontSize:"60px",marginLeft:"630px",marginTop:"40px",padding:"20px 40px"}}>+</button>
        </div>
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
        <Form.Control onChange={e=>setEmployeeDetails({...EmployeeDetails,username:e.target.value})} type="text" placeholder="username" />
      </FloatingLabel>
      <FloatingLabel className='mt-2' controlId="floatingCaption" label="email">
        <Form.Control onChange={e=>setEmployeeDetails({...EmployeeDetails,email:e.target.value})}  type="text" placeholder="email" />
      </FloatingLabel>
      <FloatingLabel className='mt-2' controlId="floatingCaption" label="status">
      <Form.Select onChange={e=>setEmployeeDetails({...EmployeeDetails,status:e.target.value})}  aria-label="Default select example">
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
          <Button onClick={handleuploadEmployees} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default Add