import { BrowserRouter,Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Quiz from './Pages/quizz.jsx'
import Quizzes from './Pages/quizzes.jsx'
import{useState, useEffect} from 'react'



 function App(){

const navigate = useNavigate()
  useEffect((ma) =>{
    const users = localStorage.getItem("User")

    if (localStorage.pathname == "/quizz" && users == null) {
      navigate("/login")

    }

    if((localStorage.pathname == "/login" || localStorage.pathname == "/register") && users){
      navigate("/quizz")
      console.log("voir quelquechose",location.pathname);
    }

 

  },[])

  return (<Routes>
      <Route
      path={"/quizz"} 
      element={<Quiz/>}
      />

      <Route
      path={"/profil"}
      element={<p>Hello Word</p>}
      />

      <Route
      path={"/"}
      element={<Register/>}
      />

      <Route
      path={"/login"}
      element={<Login/>} 
      />

      <Route
      path={"/quizzes"}
      element={<Quizzes/>}
      />

    </Routes>)
    
 }

 export default App