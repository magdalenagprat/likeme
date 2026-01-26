const express = require("express")
const cors = require("cors")

const { obtenerPosts, agregarPost } = require("./consultas")

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

