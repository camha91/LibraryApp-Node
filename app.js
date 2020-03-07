const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bookSearch = require('./server/utils/bookSearchGoogle');

const app = express();
const port = process.env.PORT || 3000;

const publicPathDirectory = path.join(__dirname, './front-end');
const viewsPath = path.join(__dirname, './front-end/templates/views');
const partialsPath = path.join(__dirname, './front-end/templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPathDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Library App',
		name: 'Camha Nguyen'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Camha Nguyen'
	});
});


app.get('/books', (req, res) => {
	if (!req.query.searchValue) {
		return res.send({
			error: "Please provide search item!"
		});
	};

	bookSearch(req.query.searchType, req.query.searchValue, (error, { title, author, pages, rating, thumbnail } = {}) => {
		if (error) {
			return res.send({ error });
		};

		res.send({ title, author, pages, rating, thumbnail });
	});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});