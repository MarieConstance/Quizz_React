import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate()

    function submitForm(e) {
        
        e.preventDefault();
        
        
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        
        fetch("http://localhost:4000/api/auth/login",{

            method: "POST",
            body: JSON.stringify(data),        

        }).then(res=> res.text().then(response=>{

            if(response == "error"){
                alert("Vous n'etes pas enregistrer Veiller créer votre compte !!")
            }
            else{
                localStorage.setItem("User", response)
                navigate("/quizz")
            }

            console.log("Je suis la reponse",response)
        }));

    }


    return (

    <form
        onSubmit={submitForm}
        className="formulaire"
     >
        <h2 className="titre"> CONNECTEZ-VOUS</h2>
        
        <div className="form">
        <div className="inpt1">
            <input type="email" placeholder="      Adresse email" name="email"/>
        </div>
        
        <div className="inpt2">
            <input type="passeword" placeholder="     Mot de Passe" name="motdepasse"/>    
        </div>
        
        </div>
        
        <button className="btnconnexion">Connexion</button>
    </form>)

}
export default Login