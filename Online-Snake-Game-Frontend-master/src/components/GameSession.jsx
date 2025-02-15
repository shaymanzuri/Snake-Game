import React from 'react'
import DataTable from 'react-data-table-component';
import styles from '../styles/dashboard.module.css'
import { api_url } from '../utils/config'; 
import axios from 'axios';

export default function GameSession() {

  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [totalScore,setTotalScore] = React.useState(0)

  const columns = [
    {
      name: 'Pseudo',
      selector: row => row.pseudo,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Score',
      selector: row => row.score,
      sortable: true,
    },
    {
      name: 'Level',
      selector: row => row.level,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    }
  ];


  async function getUsersGameSessions(){
    const data = sessionStorage.getItem('snake-user')
    const user = JSON.parse(data)
    const temp = []
    try{
      
    console.log("User: ",api_url+`/game-session?pseudo=${user?.pseudo}`)
      const ct = await axios.get(api_url+`/game-session?pseudo=${user?.pseudo}`)
      if(ct?.data){
        ct?.data?.data?.forEach((item,index)=>{
          temp.push({
            id: index+1,
            pseudo: item?.pseudo,
            description: item?.description,
            score: item?.score,
            level: item?.level,
            date: new Date(item?.createdAt).toUTCString()
          })
          setTotalScore((total)=> item.score + total)
        })

        setRows([...temp])
        setPending(false);
      }
    }catch(error){
      console.log(error)
      alert(error.response.error)
    }
  }

  React.useEffect(() => {
    getUsersGameSessions();
  }, []);
 

  return (
    <div className={styles.game_session_container}>
      <h2>
        Game Sessions History<br />
        No Games: {rows?.length} {" | "}
        Total Score: {totalScore}
      </h2>
      <div className={styles.datatable}>
        <div className={styles.sub_datatable}>
        <DataTable
          title="Game Sessions"
          columns={columns}
          data={rows}
          progressPending={pending} 
          pagination
        />
        </div>
      </div>
    </div>
  )
}
