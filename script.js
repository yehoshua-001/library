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
    console.table(book);
    // This is for testing purposes
    // displayBookToLibrary(); 
    // const books = Array.from(document.querySelectorAll('.book'));
    // books.forEach(book => {
    //     book.addEventListener("click", () => {
    //         const bookIndex = books.indexOf(book);
    //         displayBookInformation(bookIndex);
    //     });
    // });
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
    // displayBookToLibrary();
    form.reset();
    dialog.close();
    
    // const books = Array.from(document.querySelectorAll('.book'));
    // books.forEach(book => {
    //     book.addEventListener("click", () => {
    //         const bookIndex = books.indexOf(book);
    //         displayBookInformation(bookIndex);
    //     });
    // });
});

// Books displayed on the shelves after submitting
function displayBookToLibrary(){
    const lastBook = myLibrary[myLibrary.length - 1];
    const bookDesign = document.createElement('div');
};

const bookDialog = document.querySelector('#bookDialog');
const bookCard = document.querySelector('#bookDialogForm');

// Displaying modal for book information
function displayBookInformation(bookIndex){
    const book = myLibrary.at(bookIndex);
    const title = document.querySelector('form[id="book-info"] input[id="title"]');
    const author = document.querySelector('form[id="book-info"] input[id="author"]');
    const pages = document.querySelector('form[id="book-info"] input[id="pages"]');
    const datePublish = document.querySelector('form[id="book-info"] input[id="datePublish"]');

    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    datePublish.value = book.datePublish;

    bookDialog.showModal();
}

// This is for testing purposes
// for (let i = 1; i < 20; i++){
//     addBookToLibrary(`Book${i}`, 'Joshua', '67', '2026-08-29', 'not read yet');
// };