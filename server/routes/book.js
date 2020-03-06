const express = require('express')
const router = new express.Router()
const Books = require('../models/book')

// router.post('/books', async (req, res) => {
//     const book = new Books({
//         ...req.body,
//         owner: req.user._id
//     })

//     try {
//         await book.save()
//         res.status(201).send(book)
//     } catch (e) {
//         res.status(400).send(e)
//     }
    
// })

// GET /tasks?completed=true
// GET /tasks?limit=2&skip=5
// GET /tasks?sortBy=createdAt:desc
router.get('/books', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
   
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
		// const tasks = await Tasks.find({ owner: req.user._id})
		await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            },
            sort
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }

})

// router.get('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id })
		
//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
    
// })

// router.patch('/tasks/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperations) {
//         return res.status(404).send({'Error': 'Invalid updates!'})
//     }

//     try {
// 		const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
		
//         if (!task) {
//             return res.status(404).send()
//         }
		
// 		updates.forEach((update) => task[update] = req.body[update])
		
// 		await task.save()
		
//         res.send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router