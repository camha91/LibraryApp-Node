const isbnElement = document.querySelector('#isbn');
const searchBtn = document.querySelector('.search-btn');
const progressBar = document.querySelector('.progress');
const bookContent = document.querySelector('.book-content');
const cardTitle = document.querySelector('.card-title');
const authors = document.querySelector('.authors');
const publisher = document.querySelector('.publisher');
const categories = document.querySelector('.categories');
const pageCount = document.querySelector('.pageCount');
const bookImage = document.querySelector('.book-image');
const bookSummary = document.querySelector('.book-summary');


const updateBookContentUI = (bookData) => {
	if (bookData.error) {
		if (!progressBar.classList.contains("hide")) {
			progressBar.classList.add("hide");
		}
		if (!bookContent.classList.contains("hide")) {
			bookContent.classList.add("hide");
			}
		
		cardTitle.innerText = '';
		authors.innerHTML = '';
		publisher.innerText = '';
		categories.innerText = '';
		pageCount.innerText = '';
		bookSummary.innerHTML = '';
		bookImage.src = '';
		const div = document.createElement('div');
		div.className = 'alert';
		div.style = 'color:red';
		div.appendChild(document.createTextNode(bookData.error));
		const container = isbnElement.parentElement;
		container.insertBefore(div, isbnElement.nextSibling);
	} else {
		cardTitle.innerText = bookData.title;
		authors.innerHTML = bookData.authors;
		publisher.innerText = bookData.publisher;
		categories.innerText = bookData.categories;
		pageCount.innerText = bookData.pageCount;
		bookSummary.innerHTML = `<strong><i> ${bookData.description} </i> </strong>`;
		bookImage.src = bookData.imageLink;
		console.log(bookData);
		progressBar.classList.remove("hide")
		setTimeout(function() {
			progressBar.classList.add("hide");
			bookContent.classList.remove("hide");
		}, 1000);
			}
	
}
		
		
	
searchBtn.addEventListener('click', e => {
	e.preventDefault();
		
	if (isbnElement.value === '') {
		const div = document.createElement('div');
		div.className = 'alert';
		div.style = 'color:red';
		div.appendChild(document.createTextNode('Please input ISBN number!'));
		const container = isbnElenment.parentElement;
		container.insertBefore(div, isbnElenment.nextSibling);
	} else {
		const bookRouteUrl = `/books?searchType=isbn&searchValue=${isbnElement.value}`;
		console.log(bookRouteUrl);
		fetch(bookRouteUrl).then((response) => {
				response.json().then((bookData) => {
					updateBookContentUI(bookData);
				})
			}
		)
	}
});
	  
	  
// const updateBookContentUI = (bookData) => {
// 		if (bookData.error) {
// 			// edge case: ISBN not found. Try with ISBN 0134319036
// 			if (!progressBar.classList.contains("hide")) {
// 				progressBar.classList.add("hide");
// 			}
// 			if (!bookContent.classList.contains("hide")) {
// 				bookContent.classList.add("hide");
// 			}
// 			cardTitle.innerText = '';
// 			authors.innerHTML = '';
// 			publisher.innerText = '';
// 			catgories.innerText = '';
// 			pageCount.innerText = '';
// 			bookSummary.innerHTML = '';
// 			bookImage.src = '';
// 			const div = document.createElement('div');
// 			div.className = 'alert';
// 			div.style = 'color:red';
// 			div.appendChild(
// 				document.createTextNode(bookData.error)
// 			);
// 			const container = isbnElement.parentElement;
// 			container.insertBefore(div, isbnElement.nextSibling);
// 		} else {
// 			cardTitle.innerText = bookData.title;
// 			authors.innerHTML = bookData.authors;
// 			publisher.innerText = bookData.publisher;
// 			catgories.innerText = bookData.catgories;
// 			pageCount.innerText = bookData.pageCount;
// 			bookSummary.innerHTML = `<strong><i> ${bookData.description} </i> </strong>`;
// 			bookImage.src = bookData.imageLink;
// 			console.log(bookData);
// 			progressBar.classList.remove("hide");
// 			setTimeout(function() {
// 				progressBar.classList.add("hide");
// 				bookContent.classList.remove("hide");
// 			}, 1000);
// 		}
// }

// search.addEventListener('click', e => {
// 	e.preventDefault();

// 	if (isbnElement.value === '') {
// 		const div = document.createElement('div');
// 		div.className = 'alert';
// 		div.style = 'color:red';
// 		div.appendChild(
// 			document.createTextNode('ISBN is empty! Please input ISBN number.')
// 		);
// 		const container = isbnElement.parentElement;
// 		container.insertBefore(div, isbnElement.nextSibling);
// 	} else {
// 		const bookRouteUrl = `/books?searchType=isbn&searchValue=${isbnElement.value}`;
// 		console.log(bookRouteUrl);
// 		fetch(bookRouteUrl).then((response) => {
// 				response.json().then((bookData) => {
// 					updateBookContentUI(bookData);
// 				})
// 			}
// 		)
// 	}
	
	
// });