const MongoStore = require('../server/store/MongoStore');

const testData = {
	title: 'Automate the Boring Stuff with Python: Practical Programming for Total Beginners',
	authors: 'Al Sweigart',
	categories: 'Computers',
	pageCount: 504,
	imageLink:
		'https://books.google.com/books/content?id=8AcvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
	description:
		'If you’ve ever spent hours renaming files or updating hundreds of spreadsheet cells, you know how tedious tasks like these can be. But what if you could have your computer do them for you? In Automate the Boring Stuff with Python, you’ll learn how to use Python to write programs that do in minutes what would take you hours to do by hand—no prior programming experience required. Once you’ve mastered the basics of programming, you’ll create Python programs that effortlessly perform useful and impressive feats of automation to: –Search for text in a file or across multiple files –Create, update, move, and rename files and folders –Search the Web and download online content –Update and format data in Excel spreadsheets of any size –Split, merge, watermark, and encrypt PDFs –Send reminder emails and text notifications –Fill out online forms Step-by-step instructions walk you through each program, and practice projects at the end of each chapter challenge you to improve those programs and use your newfound skills to automate similar tasks. Don’t spend your time doing work a well-trained monkey could do. Even if you’ve never written a line of code, you can make your computer do the grunt work. Learn how in Automate the Boring Stuff with Python. Note: The programs in this book are written to run on Python 3.'
};

const mongoStore = new MongoStore();
mongoStore.saveBook(testData);