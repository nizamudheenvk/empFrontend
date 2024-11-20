import { useState } from 'react'
import './App.css'
import Add from './componenets/Add'
import View from './componenets/View'


function App() {
  
  const [addresponseFromApp,setAddresponseFromApp]=useState("")

  return (
   <>
    <Add setAddresponseFromApp={setAddresponseFromApp}/>
    <View addresponseFromApp={addresponseFromApp}/>

    </>
  )
}

export default App
