import {useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'
import { api_url } from '../utils/config' 
import { Link, useNavigate } from 'react-router-dom' 
import { isUserLoggedIn } from '../utils/helper' 
import { VscSnake } from "react-icons/vsc";

export default function Signup() {
  const navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState('')
  const [successMessage,setSuccessMessage] = useState('')
  const [pseudo,setPseudo] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')


//   function to login user
  async function registerUser() {
    try {
      const response = await axios.post(`${api_url}/users`, {
        name,pseudo,password
      });
      
    //   saving users credentials in session storage
      sessionStorage.setItem('snake-user',JSON.stringify(response.data.data))
      setSuccessMessage(response?.data?.message)
      setTimeout(()=>{
        navigate('/')
      },2000)
    } catch (error) {
        console.log("error: ",error.response)
      // Handle error
      setErrorMessage(error.response.data.error)
    }
  }

  const onsubmit=(e)=>{
    e.preventDefault()
    if(!pseudo || !password || !name){
        alert('All fields are required !!!')
    }else{
        registerUser();
    }
  }

  useEffect(()=>{
    if(isUserLoggedIn()){
        navigate("/")
    }
  },[])


  return (
    <div className={styles.container}>
    <div className={styles.card}>
        <div className={styles.header_text}>
            <h2>Create Account Snake Game </h2>
            <VscSnake size={30} color='red' />
        </div>
        <h4 className={styles.error_msg}>{errorMessage}</h4>
        <h4 className={styles.success_msg}>{successMessage}</h4>
        <form  onSubmit={onsubmit}>
         
        <input type="text" id="username" name="name" value={name} onChange={(e)=> setName(e.target.value)}
         placeholder="Fullname" required />

        <input type="text" id="username" name="username" value={pseudo} onChange={(e)=> setPseudo(e.target.value)}
         placeholder="Pseudo" required />

        <input type="password" id="password" name="password" value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required />

        <button type="submit">Sign up</button>
        </form>

        <Link to={"/login"} className={styles.auth_link}>Already have an account ? login</Link>
    </div>
    </div>
  )
}
