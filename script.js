const myLibrary = [];

function Book(title, author, pageNr, status){
    this.title=title;
    this.author=author;
    this.pageNr=pageNr;
    this.status=status;
}

const bookForm = document.getElementById('book-form');
const libraryCards = document.getElementById('library-cards');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pageNr = document.getElementById('page-nr').value;
    const read = document.getElementById('read');
    const unread = document.getElementById('unread');
    let status;

    if(read.checked){
        status=read.value;
    } else {
        status = unread.value;
    }
    
    const newBook = new Book(title, author, pageNr, status);
    myLibrary.push(newBook);

    displayBooks();

    bookForm.reset();
    console.log(myLibrary);
})

function displayBooks() {
    libraryCards.innerHTML='';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML= `<h2>Title: ${book.title}</h2>
                            <h3>Author: ${book.author}</h3>
                            <h4>No. of pages: ${book.pageNr}</h4>
                            <h4>${book.status}<h4>
                            <button class="toggle-button" data-readIndex="${index}">Read/Unread</button>
                            <button class="remove-button" data-removeIndex="${index}">Remove</button`;
        libraryCards.appendChild(bookCard);
    });

    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleStatus);
    })

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });
}

function toggleStatus(e) {
    const index = e.target.getAttribute('data-readIndex');
    const book = myLibrary[index];

    if (book.status === 'Read') {
        book.status = 'Unread';
    } else {
        book.status = 'Read';
    }

    displayBooks();
}


function removeBook(e) {
    const index = e.target.getAttribute('data-removeIndex');
    myLibrary.splice(index, 1);
    displayBooks();
}

