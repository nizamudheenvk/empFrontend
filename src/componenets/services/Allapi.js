import commonApi from "./commonApi"
import SERVERURL from "./serverUrl"


export const saveEmpAPI = async (EmpDetails)=>{
    return await commonApi("POST",`${SERVERURL}/uploadEmp`,EmpDetails)
  }
  export const getAllEmpApi = async ()=>{
    return await commonApi("GET",`${SERVERURL}/uploadEmp`,{})
  }
  export const deleteEmpApi = async (id)=>{
    return await commonApi("DELETE",`${SERVERURL}/uploadEmp/${id}`,{})
    }

  export const EditEmpApi = async (EmpDetails)=>{
    return await commonApi("PUT",`${SERVERURL}/uploadEmp/${EmpDetails.id}`,EmpDetails)
    }
