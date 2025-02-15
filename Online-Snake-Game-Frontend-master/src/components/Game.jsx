import {useState,useEffect,useRef} from 'react'
import styles from '../styles/dashboard.module.css'
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import { api_url } from '../utils/config'; 


// set the width for canvas
const WIDTH = 20;

// height of canvas
const HEIGHT = 20;
const SCALE = 20;

export default function Game() {

  const [score,setScore] = useState(0)
  const [isPlaying,setIsPlaying] = useState(false)
  const [SPEED,setSPEED] = useState(200)

  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(true);

  const [level,setLevel] = useState([
    {
      active: true,
      title: 'Easy',
      speed: 200
    },
    {
      active: false,
      title: 'Medium',
      speed: 150
    },
    {
      active: false,
      title: 'Hard',
      speed: 100
    },
  ])

  function toggleLevel(index){
    const arr = [...level]
    arr.forEach((item,idx)=>{
      if(index===idx){
        item.active = !item.active
        setSPEED(item?.speed)
      }else{
        item.active = false
      }
    })

    setLevel([...arr])
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    const render = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

      ctx.fillStyle = 'red';
      ctx.fillRect(food[0] * SCALE, food[1] * SCALE, SCALE, SCALE);

      ctx.fillStyle = 'lime';
      snake.forEach(([x, y]) => ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE));
    };
    const update = () => {
      const newSnake = [...snake];
      const head = [newSnake[0][0] + (direction === 'RIGHT' ? 1 : direction === 'LEFT' ? -1 : 0), newSnake[0][1] + (direction === 'DOWN' ? 1 : direction === 'UP' ? -1 : 0)];
      newSnake.unshift(head);
      if (head[0] === food[0] && head[1] === food[1]) {
        setFood([Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)]);
        setScore((prev)=> prev + 1);
      } else {
        newSnake.pop();
      }
      if (head[0] < 0 || head[0] >= WIDTH || head[1] < 0 || head[1] >= HEIGHT || newSnake.slice(1).some(([x, y]) => x === head[0] && y === head[1])) {
        setGameOver(true);

        // saving game session
        saveGameHistory();
        return;
      }
      setSnake(newSnake);
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        update();
        render();
      }
    }, SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, food, direction, gameOver,score]);

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 37: // Left
        setDirection('LEFT');
        break;
      case 38: // Up
        setDirection('UP');
        break;
      case 39: // Right
        setDirection('RIGHT');
        break;
      case 40: // Down
        setDirection('DOWN');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveGameHistory=async()=>{
      const data = sessionStorage.getItem('snake-user')
      const user = JSON.parse(data)
      const snakeLevel = level?.find((item)=> item.active) ?? {title:'Easy'}
      const description = `${user?.name} played level ${snakeLevel?.title} and scored ${score}`
      
      try{

        const res = await axios.post(api_url+"/game-session",{
          pseudo: user?.pseudo,
          description,
          score,
          level: snakeLevel?.title
        })

        console.log(res.data)
        alert("Game Session Recorded Successfully !!!")
        if(confirm("Do you wish to play again ??")){
          window.location.reload()
        }

      }catch(e){
        console.log("Error: ",e)
        alert("Error occured while trying to save Game session")
        if(confirm("Do you wish to play again ??")){
          window.location.reload()
        }
      }
  }

  return (
    <div className={styles.game_container}>
      <div className={styles.game}>
        {/* Snake Game Interface */}
        <div className="SnakeGame">
          <canvas
          style={{border:"2px solid white !important",outline: "white 3px solid"}}
           ref={canvasRef} width={WIDTH * SCALE} height={HEIGHT * SCALE}></canvas>
        </div>

        {/* End of Snake Game Interface */}
      </div>
      <div className={styles.leaders}>
        <div className={styles.card1}>
            <h2>{!isPlaying ? 'Select Game Level' : 'Stop Game'}</h2>
            {
              !isPlaying ? 
              
              level?.map((item,index)=>{
                return(
                  <div key={item?.title} className={styles.radio_wrapper}>
                    <input type='radio' checked={item.active}  onChange={()=> toggleLevel(index)}/>
                    <label>{item?.title}</label>
                  </div>
                )
              })
              :
              <button onClick={()=> {
                setIsPlaying(false)
                setGameOver(true)
              }} style={{backgroundColor:'red'}}>
                Stop Game
              </button>
            }
            
            {!isPlaying && 
            <button 
            onClick={()=>{
               setIsPlaying(true)
               setGameOver(false)
              }}
              style={{background: 'lightgray',color:'black',
              display:'flex',justifyContent:'between',alignItems:'center'}}>
              Start now
              <FaPlay size={16} color='green'/>
              </button>}

        </div>

        <div className={styles.card}>
            <h2>Game Score</h2>
            <h1 style={{color:'green',textAlign:'center'}}>{score}</h1>
        </div>
      </div>
    </div>
  )
}
