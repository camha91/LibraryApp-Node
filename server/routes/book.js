const MongoStore = require('../store/MongoStore');
const mongoStore = new MongoStore();
const bookSearch = require('../utils/bookSearchGoogle');
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger(__filename);

router.get('/books', (req, res) => {
	logger.debug('<----- Book Router');
	if (!req.query.searchType || !req.query.searchValue) {
		return res.send({
			error: "Please provide search Type and search Value!"
		});
	};

	bookSearch(req.query.searchType, req.query.searchValue, (error, bookData) => {
		if (error) {
			return res.send({ error });
		};
		logger.debug(`bookData : ${JSON.stringify(bookData)}`);
		// Create a bookData dict to store data
		res.send({ 
			id: bookData.id,
			title: `${bookData.volumeInfo.title}: ${bookData.volumeInfo.subtitle}`,
			authors: bookData.volumeInfo.authors.join(' , '),
			categories: bookData.volumeInfo.categories.join(' , '),
			pageCount: bookData.volumeInfo.pageCount,
			imageLink: `https://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
			description: bookData.volumeInfo.description,
		});
	});
});

router.get('/books', (req, res) => {
   	
	mongoStore.readAllBooks().then((books) => {
		res.send(books);
	}).catch((e) => {
		logger.debug(e);
	})
    

})

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



module.exports = router;