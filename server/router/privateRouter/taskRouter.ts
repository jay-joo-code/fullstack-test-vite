import express from 'express'
import Task from '../../models/Task'

const taskRouter = express.Router()

// create task
taskRouter.post('/', async (req, res) => {
  try {
    const doc = await new Task({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get user's inbox tasks
taskRouter.get('/inbox', async (req, res) => {
  try {
    const docs = await Task.find({
      userId: req.user?._id,
      due: undefined,
      isComplete: false,
    }).sort({ createdAt: -1 })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get all user's tasks
taskRouter.get('/', async (req, res) => {
  try {
    const docs = await Task.find({ userId: req.user?._id })
    res.send(docs)
  } catch (e) {
    console.log('e', e)
    res.status(500).send(e)
  }
})

taskRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Task.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.put('/:id', async (req, res) => {
  try {
    const note = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default taskRouter
