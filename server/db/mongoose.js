const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const dbAtlasPW = process.env.DB_PASS;
const dbURL = `mongodb+srv://dev-camha_91:${dbAtlasPW}@cluster0-fwsxz.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(dbURL,  {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => {
	logger.info('Connected to MongoDB Atlas (Cloud DB)!');
}).catch(err => {
	logger.error(`ERROR: ${err}`);
});