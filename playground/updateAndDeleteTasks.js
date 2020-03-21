const Tasks = require('../src/models/tasks')

Tasks.findByIdAndDelete('5e24a3c33f8c7f7d0835fc7b').then((task) => {
    console.log(task)
    return Tasks.countDocuments({ completed: false })
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async(id) => {
    await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5e2688d02f1d540183a5361d').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
}) 

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperations) {
        return res.status(404).send({'Error': 'Invalid updates!'})
    }

    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

