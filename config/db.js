import pg from 'pg';
import 'dotenv/config'
const { Pool } = pg;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    alloExitOnIdle: true
};
 const pool = new Pool(config);

/* const getDate = async() => {
const result = await pool.query('SELECT NOW()');
console.log(result.rows[0].now);
}

getDate() */

export default pool