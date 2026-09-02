const myLibrary = [];

function Book(title, author, pages, datePublish, readStatus){
    if(!new.target){
        throw Error(`You must use the 'new' operator to call the constructor`);
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.datePublish = datePublish;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, datePublish, readStatus){
    const book = new Book(title, author, pages, datePublish, readStatus);
    myLibrary.push(book);
    displayBookToLibrary();
}

const dialog = document.querySelector('#addNewBook');
const form = document.querySelector('#newBookForm');
const closeBtn = document.querySelector('.closeBtn');
const cancelBtn = document.querySelector('#cancelBtn');

closeBtn.addEventListener("click", () => {
    form.reset();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector('form[id="newBookForm"] input[id="title"]').value;
    const author = document.querySelector('form[id="newBookForm"] input[id="author"]').value;
    const pages = document.querySelector('form[id="newBookForm"] input[id="pages"]').value;
    const datePublish = document.querySelector('form[id="newBookForm"] input[id="datePublish"]').value;
    const readStatus = document.querySelector('form[id="newBookForm"] input[name="readStatus"]:checked').value;

    addBookToLibrary(title, author, pages, datePublish, readStatus);
    form.reset();
    dialog.close();
});


// Books displayed on the shelves after submitting
function displayBookToLibrary(){
    const library = document.querySelector('div[class="myLibrary"]');
    const book = myLibrary[myLibrary.length - 1];
    const bookDesign = document.createElement('div');
    bookDesign.setAttribute('data-id', `${book.id}`);
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    bookDesign.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    bookDesign.classList.add('book');
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `${book.title}`
    bookTitle.classList.add('book-title');

    bookDesign.appendChild(bookTitle);
    library.appendChild(bookDesign);

    // Loop for displaying book information
    // when a book in library is clicked
    const books = Array.from(document.querySelectorAll('.book'));
    books.forEach(book => {
        book.addEventListener("click", () => {
            const bookIndex = books.indexOf(book);
            displayBookInformation(bookIndex);
        });
    });
};

const bookDialog = document.querySelector('#showBookInfo');
const bookCard = document.querySelector('#bookInfoForm');

// Displaying modal for book information
function displayBookInformation(bookIndex){
    const book = myLibrary.at(bookIndex);
    const title = document.querySelector('form[id="bookInfoForm"] input[id="title"]');
    const author = document.querySelector('form[id="bookInfoForm"] input[id="author"]');
    const pages = document.querySelector('form[id="bookInfoForm"] input[id="pages"]');
    const datePublish = document.querySelector('form[id="bookInfoForm"] input[id="datePublish"]');
    const readStatus = document.querySelector('form[id="bookInfoForm"] input[id="readStatus"]');

    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    datePublish.value = book.datePublish;
    readStatus.value = book.readStatus;

    bookDialog.showModal();

    // const readBtn = document.querySelector('#readBtn');
    // readBtn.addEventListener("click", () => {
    //     const bookID = myLibrary[bookIndex].id;
    //     changeReadStatus(bookID);
    // });
}

// Book.prototype.changeReadStatus = function(bookID) {
//     console.log(bookID)
// }

// This is for testing purposes
for (let i = 1; i < 20; i++){
    addBookToLibrary(`Book${i}`, 'Joshua', '67', '2026-08-29', 'Yes');
};