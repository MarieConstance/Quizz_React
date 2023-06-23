import { useState, useEffect } from 'react'
import Chrono, {objet} from '../Components/Chrono'
import QuestionCard from '../Components/QuestionCard'
import { useNavigate } from 'react-router-dom'
import Quiz from './quizz'

function Quizzes() {
    
    const [Quiz, SetQuiz ] = useState([])
    const [Load, setLoad] = useState(true)

    function fetchData(){
    
        fetch("http://localhost:4000/api/quiz").then((para)=> {
    
          return para.json() 
        
        }).
        then((param) => {

          console.log("parametre", param)
          SetQuiz(param)
          setLoad(false)
          
        })  
      }

      useEffect((para) => {

        fetchData() 

      },[])


    return (<p>Hello</p>)
    
}

export default Quizzes