const isbnElement = document.querySelector('#isbn');
const search = document.querySelector('.search-btn');
const progressBar = document.querySelector('.progress');
const bookContent = document.querySelector('.book-content');
const cardTitle = document.querySelector('.card-title');
const authors = document.querySelector('.authors');
const publisher = document.querySelector('.publisher');
const catgories = document.querySelector('.catgories');
const pageCount = document.querySelector('.pageCount');
const bookSummary = document.querySelector('.book-summary');
const bookImage = document.querySelector('.book-image');

libraryForm.addEventListener('submit', (e) => {
	
	//const searchType = 
	const searchValue = search.value;
	
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	
	
	fetch(`/book?searchValue=${searchValue}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.searchValue;
				messageTwo.textContent = data.bookInfo;
			};
		});
	});
	
	e.preventDefault();
})

