function QuestionCard({question,responses,update,userResponse}){
    console.log(userResponse);
    return(
        <div className="QuestionCard">
            <p>{question}</p>
           <ul>
            {Object.keys(responses).map((e)=><li><input checked={userResponse?.includes(e)} type="checkbox" onChange={(f)=>{
                if (f.target.checked) {
                    userResponse = userResponse?[...userResponse,e]:[e]
                }
                else{
                    if(userResponse.includes(e)){
                        userResponse = userResponse?.filter((eve)=> eve != e)
                    }
                }
                update(question,userResponse)}} id="" /><span>{e}</span></li>

                )}
                
           </ul>
        </div>
    )
}

export default QuestionCard