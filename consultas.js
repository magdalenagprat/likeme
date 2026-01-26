const pool = require("./database/db")

const obtenerPosts = async () => {
    const consulta = "SELECT * FROM posts"
    const result = await pool.query(consulta)
    return result.rows
}

const agregarPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
}

module.exports = { obtenerPosts, agregarPost }