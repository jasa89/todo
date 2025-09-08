
import {pool} from '../helper/db.js'
import { auth } from '../helper/auth.js'
import { Router } from 'express'
import { ApiError } from '../helper/ApiError.js'



const router = Router()



router.get('/', (req, res, next) => {
 pool.query('SELECT * FROM task', (err, result) => {
 if (err) {
 return next(err)
 }
 res.status(200).json(result.rows ||[])
 })
})



// insert data to database
router.post('/create', auth,(req, res,next) => {
 const { task } = req.body

 if (!task) {
 return next(new ApiError('Task is required', 400))
 }
 pool.query('insert into task (description) values ($1) returning *', [task.description],
 (err, result) => {
 if (err) {
 return next(new ApiError('Database error', 500))
 }
 res.status(201).json({id: result.rows[0].id, description: task.description})
 })
})


// delete data from database
router.delete('/delete/:id', auth, (req, res,next) => {
 const { id } = req.params
 pool.query('delete from task WHERE id = $1',
 [id],
 (err, result) => {
 if (err) {
  return next(new ApiError('Database error', 500))
 }
 if (result.rowCount === 0) {

 return next(new ApiError('Task not found', 404))
 }
 return res.status(200).json({id:id})
 })

})

export default router