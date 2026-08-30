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

const shelf1 = document.querySelector('div[id="shelf1"]');
const shelf2 = document.querySelector('div[id="shelf2"]');
const shelf3 = document.querySelector('div[id="shelf3"]');

function addBookToLibrary(title, author, pages, datePublish, readStatus){
    const book = new Book(title, author, pages, datePublish, readStatus);
    myLibrary.push(book);

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

const form = document.querySelector('#form');
const dialog = document.querySelector('#dialog');
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
    const title = document.querySelector('form[id="form"] input[id="title"]').value;
    const author = document.querySelector('form[id="form"] input[id="author"]').value;
    const pages = document.querySelector('form[id="form"] input[id="pages"]').value;
    const datePublish = document.querySelector('form[id="form"] input[id="datePublish"]').value;
    const readStatus = document.querySelector('form[id="form"] input[name="readStatus"]:checked').value;

    addBookToLibrary(title, author, pages, datePublish, readStatus);
    displayBookToLibrary();
    form.reset();
    dialog.close();
    
    const books = Array.from(document.querySelectorAll('.book'));
    books.forEach(book => {
        book.addEventListener("click", () => {
            const bookIndex = books.indexOf(book);
            displayBookInformation(bookIndex);
        });
    });
});

// Books displayed on the shelves after submitting
function displayBookToLibrary(){
    const lastBook = myLibrary[myLibrary.length - 1];
    const bookDesign = document.createElement('div');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    bookDesign.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    bookDesign.classList.add('book');
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `${lastBook.title}`
    bookTitle.classList.add('book-title');
    // Conditional statements for books to check which shelves
    // has space then store itself next to the last book
    if(shelf1.children.length != 14){
        shelf1.appendChild(bookDesign);
        bookDesign.appendChild(bookTitle);
    }
    else if(shelf1.children.length == 14 && shelf2.children.length != 14){
        shelf2.appendChild(bookDesign);
        bookDesign.appendChild(bookTitle);
    }
    else if(shelf2.children.length == 14 && shelf3.children.length != 14){
        shelf3.appendChild(bookDesign);
        bookDesign.appendChild(bookTitle);
    }
};

const bookDialog = document.querySelector('#bookDialog');
const bookCard = document.querySelector('#bookDialogForm');

// Displaying modal for book information
function displayBookInformation(bookIndex){
    const book = myLibrary.at(bookIndex);
    const title = document.querySelector('form[id="bookDialogForm"] input[id="title"]');
    const author = document.querySelector('form[id="bookDialogForm"] input[id="author"]');
    const pages = document.querySelector('form[id="bookDialogForm"] input[id="pages"]');
    const datePublish = document.querySelector('form[id="bookDialogForm"] input[id="datePublish"]');

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