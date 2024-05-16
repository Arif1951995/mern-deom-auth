import React, { useContext, useState } from 'react'
import AuthService from "../services/AuthService"
import {useAuth} from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({name: "", password: ""});
  const {handleLoginSuccess} = useAuth();  
  const handleSubmit = async (ev) => {
      console.log("handleSubmit")
    ev.preventDefault()
      const data = await AuthService.login(state);
      console.log(data)
      if(data.token) {
        console.log("1");
        handleLoginSuccess(data);
        console.log("2");
       
        navigate("/")

      }
      console.log({data});
  }


  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setState({...state,[name]: value})
  }


  console.log({state})

  return (
    <div className='w-[80%] mx-auto border-2 border-black'>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label>Name</label>
          <input onChange={handleChange} className='border-[1px] border-gray-600' name='name' value={state.name} />
        </div>
        <div className='mb-5'>
          <label>Password</label>
          <input onChange={handleChange} className='border-[1px] border-gray-600' name='password' type='password' value={state.password} />
        </div>
        <button className='bg-slate-600 px-10 py-2 text-white rounded-md' type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default Login