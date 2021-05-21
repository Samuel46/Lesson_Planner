import React from 'react'
import { Spinner } from 'reactstrap'

const Spinners = () => {
  return (
      <div className="spinner--width">

     <div className=" ">
    
      <Spinner type='grow' color='primary'/>
     
      
      <Spinner type='grow' color='danger' />
      
      <Spinner type='grow' color='info' />
   
     
   

    </div>

    </div>
  )
}
export default Spinners