import {useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'
import { api_url } from '../utils/config' 
import { useNavigate, Link } from 'react-router-dom' 
import { isUserLoggedIn } from '../utils/helper' 
import { VscSnake } from "react-icons/vsc";

export default function Login() {
  const navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState('')
  const [pseudo,setPseudo] = useState('')
  const [password,setPassword] = useState('')


//   function to login user
  async function loginUser() {
    try {
      const response = await axios.post(`${api_url}/users/login`, {
        pseudo,password
      });
      
    //   saving users credentials in session storage
      sessionStorage.setItem('snake-user',JSON.stringify(response.data.data))
      navigate('/register')
    } catch (error) {
        console.log("error: ",error.response)
      // Handle error
      setErrorMessage(error.response.data.error)
    }
  }

  const onsubmit=(e)=>{
    e.preventDefault()
    if(!pseudo || !password){
        alert('All fields are required !!!')
    }else{
        loginUser();
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
            <h2>Login To Snake Game </h2>
            <VscSnake size={30} color='red' />
        </div>
        <h4 className={styles.error_msg}>{errorMessage}</h4>
        <form  onSubmit={onsubmit}>
        <input type="text" id="username" name="username" value={pseudo} onChange={(e)=> setPseudo(e.target.value)}
         placeholder="Pseudo" required />

        <input type="password" id="password" name="password" value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required />

        <button type="submit">Login</button>
        </form>

        <Link to={"/register"} className={styles.auth_link}>Don't have an account ? register</Link>
    </div>
    </div>
  )
}
