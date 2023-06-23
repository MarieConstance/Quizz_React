import http from "http"
import fs from "fs"
import path from "path"

const server = http.createServer(((req, res)=>{
    console.log("voir nos requettes",req.url, req.method);
    res.setHeader("Access-Control-Allow-Origin", "*")

    if(req.url == "/api/auth/register" && req.method == "POST"){
      
        let body = ""
        req.on("data", (chenck)=>{
            console.log(chenck)
            body += chenck
        })
        req.on("end", ()=>{
            body = JSON.parse(body)
            console.log("gjxsjsjsg",body)

            let oldData = fs.readFileSync(path.join("api","Data", "user.json"), {"encoding": "utf-8"})
            oldData = JSON.parse(oldData)
            oldData.push(body)
            console.log("ezzeyeyeer",oldData)
            fs.writeFileSync(path.join("api","Data", "user.json"),JSON.stringify(oldData), {"encoding": "utf-8"})
          
            
        })
        res.end("ok")
    }

    //login

    if (req.url == "/api/auth/login" && req.method == "POST") {

        let body = ""

        req.on("data", (chenck)=>{
            console.log(chenck)
            body += chenck
        })

        req.on("end", ()=>{

            body = JSON.parse(body)
            console.log("gjxsjsjsg",body)

            let oldData = fs.readFileSync(path.join("api","Data", "user.json"), {"encoding": "utf-8"})
            oldData = JSON.parse(oldData)
            
            let redirec = oldData.find((even)=>even.email == body.email && even.motdepasse == body.motdepasse)

            if (redirec) {
                return res.end(redirec.email)
            }
            else{
                return res.end("error")
            }
        })
    
    }

    //quizzes

    if(req.url == "/api/quiz" && req.method == "GET"){

        let qzData = fs.readFileSync(path.join("api","Data","quizzes.json"), {"encoding": "utf-8"})
        res.setHeader("Content-Type", "application/json")
        res.end(qzData)

    }
   
    
}))

server.listen(4000, (e)=>{
    console.log("Server démarrer avec succes !!!")
})