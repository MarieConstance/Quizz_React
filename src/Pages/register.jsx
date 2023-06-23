import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    function submitForm(e) {
        
        e.preventDefault();
        
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        
        fetch("http://localhost:4000/api/auth/register",{

            method: "POST",
            body: JSON.stringify(data),        

        }).then(res=> navigate("/login"))
       

    }
    
    return(

        <form
            onSubmit={submitForm} 
            className="formulaire2"
           
        >
        <h2 className="titre"> INSCRIVEZ-VOUS</h2>
        
        <div className="form">

        <div className="inpt1">
            <input type="text" placeholder="     Nom" name="nom" />
        </div>

        <div className="inpt2">
            <input type="text" placeholder="     Prenoms" name="prenom"/>
        </div>

        <div className="inpt1">
            <input type="email" placeholder="      Adresse email" name="email"/>
        </div>
        
        <div className="inpt2">
            <input type="passeword" placeholder="     Mot de Passe" name="motdepasse"/>    
        </div>
        
        </div>
        
        <button className="btnconnexion">ENREGISTRER</button>
    </form>
    )
}

export default Register