const MongoStore = require('../server/store/MongoStore');


const mongoStore = new MongoStore();
const id = '5e70625e0d39f816895c1aa9';
// mongoStore.updateTitle(id, 'Automate Boring Stuff With Python');

// mongoStore.updateAuthor(id, 'Al Sweigart');

mongoStore.deleteBook(id)