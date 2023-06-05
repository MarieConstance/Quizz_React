import { useState,useEffect } from 'react'


function Chrono({time:Time,finQuizz,questionLength,answerLength}){
    const [time,setTime]= useState(Time)
    let inter = null

    useEffect((e)=>{ 
        if(time > 0){
            inter = setInterval((a)=>{
                setTime(time-1)

            }, 1000)
        }
        else{
            finQuizz()
        }
        return ()=>{
            console.log("end")
            clearInterval(inter)
        }
    },[time])

    return  <div className="chrono">
               <div>
                    <span>time:</span><span>{time}</span>
               </div>
               <p>{answerLength}/{questionLength}</p>
            </div>
}

let objet = {key1: "Bonjour", key2: "Salut"}
export default Chrono
export{
  objet  
}