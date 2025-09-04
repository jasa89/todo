import { pool } from '../helpers/db.js'
const selectAllTasks = async () => {
 return await pool.query('SELECT * FROM task')
}
export { selectAllTasks }