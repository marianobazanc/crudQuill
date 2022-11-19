const mongoose = require("mongoose")

const cursoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        min: 4,
        max: 256
    },
    ubicacion: {
        type: String,
        required: true,
        min: 6,
        max: 256
    },
    caracteristica: {
        type: String,
        required: true
    },
    informacion: {
        type: String
    }
})
module.exports = mongoose.model("Curso", cursoSchema)