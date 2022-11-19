const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()

const app = express()

//Configuracion CORS
const cors = require("cors")
let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

//Capturar BODY
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Conexion a la BD
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zwqco.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Base de datos conectada con exito!"))
.catch(e => console.log("Error al conectar con la base de datos: ", e)) 
 
 //Importacion de ROUTES
 const trabajoRoutes = require("./routes/trabajo")  
 const cursoRoutes = require("./routes/curso")

 //Routes middleware
 app.use("/api", trabajoRoutes, cursoRoutes) 

let PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log("El servidor esta corriendo en el puerto " + PORT)
})