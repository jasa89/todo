import { pool } from '../helper/db.js'
import { auth } from '../helper/auth.js'

import { selectAllTasks } from '../models/Task.js'
const getTasks = async (req, res,next) => {
 try {
 const result = await selectAllTasks()
 return res.status(200).json(result.rows || [])
 } catch (error) {
 return next(error)
 }
}
export { getTasks }

const insertTask = async (description) => {
 return await pool.query('insert into task (description) values ($1) returning *', [description])
}
export { selectAllTasks, insertTask }

const postTask = async (req, res,next) => {
 const { task } = req.body
    
 try {
 if (!task || !task.description || task.description.trim().length === 0) {
    return next(new AliError('Task description is required', 400))
    /* const error = new Error('Task description is required')
 error.status = 400
 return next(error)*/
 }
 const result = await insertTask(task.description)
 return res.status(201).json({id: result.rows[0].id, description: result.rows[0].description})
 } catch (error) {
    return next(error)
 }
}
export { getTasks, postTask }

if (!task || !task.description || task.description.trim().length === 0) {
 const error = new Error('Task description is required')
 error.status = 400
 return next(error)
 }
