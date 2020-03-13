const logging = require('./commonUtils/loggingUtils');
const logger = logging.getLogger('MainApp');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bookRouter = require('./server/routes/book');

console.log('https://libraryappnode1-zpicx.run-us-west2.goorm.io');
const app = express();
const port = process.env.PORT || 3000;

const publicPathDirectory = path.join(__dirname, './front-end');
console.log(publicPathDirectory);

const viewsPath = path.join(__dirname, './front-end/templates/views');
const partialsPath = path.join(__dirname, './front-end/templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// body parser json
app.use(express.json());

// Setup log for app
app.use(logging.expressLogger);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));

// Setup book bookRouter
app.use(bookRouter);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Book Search',
		name: 'Camha Nguyen'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Student Info',
		name: 'Camha Nguyen'
	});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});