import "dotenv/config"
import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

pool.on("error", error =>{

    console.error("Erro cliente ocioso", error)
}
)

export {pool}