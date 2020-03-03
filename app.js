const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bookCode = require('./server/routes/book')

const app = express()
const port = process.env.PORT || 3000

const cssPath = path.join(__dirname, './front-end/css')
const viewsPath = path.join(__dirname, './front-end/templates/views')
const partialsPath = path.join(__dirname, './front-end/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(cssPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Library App',
		name: 'Camha Nguyen'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Camha Nguyen'
	})
})

app.get('/shopping_cart', (req, res) => {
	res.render('shopping cart', {
		title: 'Shopping Cart',
		bookToBorrow: 'Here are the books you want to borrow from the library!',
		name: 'Camha Nguyen'
	})
})

app.get('/shopping_cart/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Shopping cart item not found.',
		name: 'Camha Nguyen'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found.',
		name: 'Camha Nguyen'
	})
})

app.get('/book', (req, res) => {
	if (!req.query.isbn) {
		return res.send({
			error: "Please provide ISBN!"
		})
	}

	bookCode(req.query.isbn, (error, { title, author, pages, thumbnail } = {}) => {
		if (error) {
			return res.send({ error })
		}
	})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})