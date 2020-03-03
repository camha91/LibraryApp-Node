const libraryForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

libraryForm.addEventListener('submit', (e) => {
	
	const isbn = search.value
	
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	
	
	fetch(`/book?isbn=${isbn}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.isbn
				messageTwo.textContent = data.forecast
			}
		})
	})
	
	e.preventDefault()
})

