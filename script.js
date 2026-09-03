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

Book.prototype.changeReadStatus = function(){
    if(this.readStatus === "Yes"){
        this.readStatus = "Not yet";
    }
    else if(this.readStatus === "Not yet"){
        this.readStatus = "Yes";
    }
};

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

const library = document.querySelector('div[class="myLibrary"]');
const bookDialog = document.querySelector('#showBookInfo');

// Books displayed on the shelves after submitting
function displayBookToLibrary(){
    library.replaceChildren();
    myLibrary.forEach((book, index) => {
        const bookID = myLibrary[index].id;
        const bookCover = document.createElement('div');
        bookCover.setAttribute('data-id', `${bookID}`);
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        bookCover.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        bookCover.classList.add('book');
        const bookTitle = document.createElement('p');
        bookTitle.textContent = `${myLibrary[index].title}`;
        bookTitle.classList.add('book-title');
        bookCover.appendChild(bookTitle);
        library.appendChild(bookCover);

        bookCover.addEventListener("click", () => {
            displayBookInformation(index);
        });
    });
};


// Displaying modal for book information
function displayBookInformation(index){
    const book = myLibrary[index];
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

    const readBtn = document.querySelector('#readBtn');
    readBtn.addEventListener("click", () => {
        book.changeReadStatus();    
        displayBookInformation(index);
    });

    const remove = document.querySelector('button[id="removeBtn"]');
    remove.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        bookDialog.close();
        displayBookToLibrary();
    });
}

// This is for testing purposes
addBookToLibrary(`Book1`, 'Joshua', '67', '2026-08-29', 'Yes');
addBookToLibrary(`Book2`, 'Joshua', '69', '2026-08-29', 'Not yet');
addBookToLibrary(`Book3`, 'Joshua', '1738', '2026-08-29', 'Yes');
