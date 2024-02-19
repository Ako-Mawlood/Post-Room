"use client"
import {FormEvent} from "react"

const EmailPasswordInputs = () => {
  function handleSubmit(e:FormEvent){

  
  }
  return (
    <form className=" w-1/2 h-1/2 bg-purple flex flex-col justify-around items-start" onSubmit={handleSubmit}>
      
      <div>
        <label>Email</label>
        <input type="email" />
      </div>

      <div>
        <label>Password</label>
        <input type="email" />
      </div>

      <input type="submit" />
    </form>
  )
}

export default EmailPasswordInputs