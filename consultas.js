const pool = require("./database/db")

const obtenerPosts = async () => {
    const consulta = "SELECT * FROM posts ORDER BY id DESC"
    const result = await pool.query(consulta)
    return result.rows
}

const agregarPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
}

const agregarLikes = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    try {
        const result = await pool.query(consulta, values)
        if (result.rowCount === 0) {
            throw new Error("Post no existe");
        }
        return result.rows[0].likes;
    } catch (error) {
        throw { error: error.message }
    }
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    try {
        const result = await pool.query(consulta, values)
        if (result.rowCount === 0) {
            throw new Error("Post no existe");
        }
    } catch (error) {
        throw { error: error.message }
    }
}
module.exports = { obtenerPosts, agregarPost, agregarLikes, eliminarPost }