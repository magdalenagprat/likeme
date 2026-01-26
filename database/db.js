const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'likeme',
    allowExitOnIdle: true
})

module.exports = pool