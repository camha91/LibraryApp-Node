const libraryForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

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

