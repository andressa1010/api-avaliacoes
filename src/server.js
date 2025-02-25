import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import avaliacoesRouter from "./routes/avaliacoes.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())


app.use("/avaliacoes",avaliacoesRouter)

app.get("/", (req,res)=>{
    res.send("Api de avaliações loja de bolos e doces de leite")
})


app.listen(3000, ()=>{
    console.log("Api rodando na porta http://localhost:3000")
})
