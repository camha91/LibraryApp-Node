
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const dumpDataDirectoryPath = path.join(process.env.ROOT_DIR, './playground/dumpData');
const MongoStore = require('../server/store/MongoStore');

const mongoStore = new MongoStore();

// Read each file in dumpData
fs.readdir(dumpDataDirectoryPath, (err, files) => {
	console.log(files);
	files.forEach(file => {
		// Get file directory to each file
		const file_path = path.join(dumpDataDirectoryPath, file);
		
		try {
			const bookData = require(file_path);
			// console.log(bookData);
			const imageLink = bookData.imageLink;
			bookData.imageLink = imageLink.replace('\n', '');
			// Each file is a JSON object, push it to DB
			mongoStore.saveBook(bookData);
			console.log(`Pushed book in ${file_path} to DB`);

		} catch(e) {
			console.log(`${file} is BROKEN`);
		};

	});
});
