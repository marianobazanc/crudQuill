const router = require("express").Router()
const Curso = require("../models/Curso")

router.get("/cursos", async(req, res) => {
    const curso = await Curso.find()
    res.send(curso)
})

router.get("/cursos/:id", async(req, res) => {
    const curso = await Curso.findById(req.params.id)
    res.send(curso)
})

router.post("/cursos", async(req, res) => {
    const {body} = req
    const nuevoCurso = new Curso(body)
    await nuevoCurso.save()
    res.send(nuevoCurso)
})

router.put("/cursos/:id", async(req, res) => {
    const {body, params} = req
    const curso = await Curso.findOneAndUpdate(
        {_id: params.id},
        {_id: params.id, ...body}
    )
    res.send(curso)
})

router.delete("/cursos/:id", async(req, res) => {
    await Curso.findByIdAndDelete(req.params.id)
    res.json({message: "Curso eliminado correctamente"})
})

module.exports = router 