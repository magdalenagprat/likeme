const express = require("express")
const cors = require("cors")

const { obtenerPosts, agregarPost, agregarLikes, eliminarPost } = require("./consultas")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log("Servidor corriendo")
})

app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const post = req.body
    await agregarPost(post.titulo, post.url, post.descripcion)
    res.json({ message: "Post agregado correctamente" })
})

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params
    try {
        await agregarLikes(id)
        res.json({ message: "Like agregado" })
    } catch (error) {
        res.json({ error: "Error al agregar el like" })
    }
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    try {
        await eliminarPost(id)
        res.json({ message: "Post eliminado correctamente" })
    } catch (error) {
        res.json({ error: "Error al eliminar post" })
    }
})

