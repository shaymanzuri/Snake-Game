import {useEffect,useState} from 'react'
import { isUserLoggedIn } from '../utils/helper' 
import { useNavigate } from 'react-router-dom' 
import styles from '../styles/dashboard.module.css'
import { VscSnake } from "react-icons/vsc";
import Game from '../components/Game';
import GameSession from '../components/GameSession';

export default function Dashboard() {
 const navigate = useNavigate()
 useEffect(()=>{
    if(!isUserLoggedIn()){
        window.location.href='/login'
    }
 },[])


 const [navList,setNavList] = useState([
    {
        title: 'Game',
        active: true,
        element: Game
    },
    {
        title: 'Game History',
        active: false,
        element: GameSession
    }
 ])

 function toggleNavBar(index){
    const arr = [...navList]
    arr.forEach((item,idx)=>{
        if(index===idx){
            item.active = true
        }else{
            item.active = false
        }
    })

    setNavList([...arr])
 }

 return(
    <div className={styles.main}>
        <nav>
            <div className={styles.nav_left}>
            <h1 style={{marginRight: '2%'}}>Snake Game Menu</h1>
            <VscSnake size={30}/>
            </div>

            <div className={styles.nav_right}>
                <ul>
                    {
                        navList?.map((item,index)=>{
                            return(
                                item?.active ?
                                <li key={item?.title} onClick={()=>toggleNavBar(index)} className={styles.activeTab}>{item?.title}</li>
                                :
                                <li key={item?.title} onClick={()=>toggleNavBar(index)}>{item?.title}</li>
                            )
                        })
                    }
                </ul>
            </div>

            <button style={{backgroundColor:'red'}} onClick={()=> {
                sessionStorage.clear()
                navigate("/login")
            }}>Logout</button>
        </nav>
        <div className={styles.main_container}>
            <div className={styles.body}>
                {navList?.map((item,index)=> item.active && <item.element key={item?.title+index.toString()} />)}
            </div>
        </div>
    </div>
 );
}


