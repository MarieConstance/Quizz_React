import { useState, useEffect } from 'react'
import Chrono, {objet} from '../Components/Chrono'
import QuestionCard from '../Components/QuestionCard'
import { useNavigate } from 'react-router-dom'

let Quizz = {
  questions :[
    {question:"qu'est ce que JavaScript?",response:{"un langage":false, "un framework":false, "un langage de programmation": true}},
    {question:"qu'est ce que React?",response:{"un langage":false, "un framework":true, "une ligne de code": false}},
    {question:"qu'est ce que NodeJS?",response:{"un langage":false, "un environnement de developpement":true, "une chaine de caractère": false}},
    {question:"qu'est ce que React Native?",response:{"un langage":false, "un sdk":true, "un tableau": false}},
    {question:"qu'est ce qu'e Three.JS'?",response:{"un langage":false, "un framework":false, "une librairie": true}},
    {question:"qu'est ce qu'une variable'?",response:{"un mot":false, "un stocker d'information":false, "une librairie": true}},
    {question:"qu'est ce qu'un tableau'?",response:{"une varable pouvant contenir plusierurs données":true, "un case":false, "une librairie": true}},
    {question:"qu'est ce que Objet?",response:{"une boite":false, "un tableau":false, "une entité a part entiè re qui possède un type": true}},
],

  Points:8,
  time : 50,

}

function Quiz() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const [Answers, setAnswers] = useState({})
  const [GameOver, setGameOver] = useState(false)
  const [Result, setResult]= useState({})
  const [StateQuizz, setSateQuizz]= useState(false)
  const [Time, setTime]= useState(0)

  useEffect((even)=>{
    
    let endTime = sessionStorage.getItem("endTime")

    const users = localStorage.getItem("User")
    if(users){

      fetchData()

      if(endTime){
        setSateQuizz(true)
        setTime(Math.round((parseInt(endTime) -new Date().getTime())/1000))
      }
  
      let answers =sessionStorage.getItem("Answers")
      console.log("answer sessionStorage",JSON.parse(answers))
      if (answers) {
        
        setAnswers(JSON.parse(answers))
  
      }


    } 
    else{
      navigate("/login")
    }
    
  },[])



  function UpdateAnswer(question,reponse){

    Answers[question]= reponse

    sessionStorage.setItem("Answers", JSON.stringify(Answers))
    setAnswers({...Answers})
   
  }


  function submitQuizz(params) {
   setGameOver(true)

   getResult()

  }

  function getResult(){
    
    let compt = 0
    for (let question in Answers ) {

       let mavaleur = Answers[question]
       let recup = Quizz.questions.find((f)=>f.question == question)
       let recupreponseVrai = Object.entries(recup.response).filter(p=>p[1]).map((eve)=> eve[0])
       console.log("comparaisons",mavaleur,recupreponseVrai)
      
       let countUserResponse = 0
       let pointByResponse = 1/recupreponseVrai.length

       recupreponseVrai.forEach(elem => {
        
        if(mavaleur.includes(elem)){
          countUserResponse += pointByResponse
        }
        else{

          if(countUserResponse > 0){
            countUserResponse -= pointByResponse
          }

        }

       });
       compt += countUserResponse

    }

    setResult({questionTrouve :(compt * Quizz.Points )/ Quizz.questions.length, percent :(compt * 100)/Quizz.Points, Pointtotal:compt})

  }

  return StateQuizz? GameOver?<div className='cardAffich'>
    <p className='p1'>Nombre de questions = {Quizz.questions.length}</p>
    <p className='p2'>Question Trouvée = {Result.questionTrouve}</p>
    <p className='p3'>Point Total = {Result.Pointtotal} </p>

    <button onClick={(e)=>{

      sessionStorage.clear()
      setSateQuizz(false)
      setAnswers({})
      setResult({})
      setGameOver(false)

  }}>Retry</button>

    
    </div>:<>

    <Chrono time={Time} finQuizz={submitQuizz} questionLength={Quizz.questions.length} answerLength={Object.values(Answers).filter((eve)=>eve.length > 0).length}/>
      <div className='cardQuestion'>
        {
          Quizz.questions.map((a)=> <QuestionCard question={a.question} responses={a.response} update={UpdateAnswer} userResponse={Answers[a.question]}/>)
        }
      </div>
      <button onClick={(e)=>{
        getResult()
        setGameOver(true)
        
      }}>submit</button>
      </>: <button className='commencer' onClick={(e)=>{

        sessionStorage.setItem("endTime",new Date().getTime()+ (Quizz.time * 1000))
        setSateQuizz(true)
        setTime(Quizz.time)

      }}>State Quizz</button>
}

export default Quiz
