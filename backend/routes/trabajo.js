const router = require("express").Router()
const Trabajo = require("../models/Trabajo")

router.get("/trabajos", async(req, res) => {
    const trabajo = await Trabajo.find()
    res.send(trabajo)
})

router.get("/trabajos/:id", async(req, res) => {
    const trabajo = await Trabajo.findById(req.params.id)
    res.send(trabajo)
})

router.post("/trabajos", async(req, res) => {
    const {body} = req
    const nuevoTrabajo = new Trabajo(body)
    await nuevoTrabajo.save()
    res.send(nuevoTrabajo)
})

router.put("/trabajos/:id", async(req, res) => {
    const {body, params} = req
    const trabajo = await Trabajo.findOneAndUpdate(
        {_id: params.id},
        {_id: params.id, ...body}
    )
    res.send(trabajo)
})

router.delete("/trabajos/:id", async(req, res) => {
    await Trabajo.findByIdAndDelete(req.params.id)
    res.json({message: "Trabajo eliminado correctamente"})
})

module.exports = router 