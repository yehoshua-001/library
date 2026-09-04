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
    else{
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
        const card = document.createElement('div');
        card.setAttribute('data-id', `${bookID}`);
        card.classList.add('book');
        const title = document.createElement('p');
        title.textContent = `Title: ${myLibrary[index].title}`;
        title.classList.add('title');
        card.appendChild(title);
        const author = document.createElement('p');
        author.textContent = `Author: ${myLibrary[index].author}`;
        author.classList.add('author');
        card.appendChild(author);
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${myLibrary[index].pages}`;
        pages.classList.add('pages');
        card.appendChild(pages);
        const datePublish = document.createElement('p');
        datePublish.textContent = `Date Published: ${myLibrary[index].datePublish}`;
        datePublish.classList.add('datePublish');
        card.appendChild(datePublish);
        const readStatus = document.createElement('p');
        readStatus.textContent = `Read:  ${myLibrary[index].readStatus}`;
        readStatus.classList.add('readStatus');
        card.appendChild(readStatus);

        library.appendChild(card);

        const readBtn = document.createElement('button');
        readBtn.textContent = "Change Read";
        readBtn.classList.add('readBtn');
        card.appendChild(readBtn);
        readBtn.addEventListener("click", () => {
            book.changeReadStatus();
            displayBookToLibrary();
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('removeBtn');
        card.appendChild(removeBtn);
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBookToLibrary();
        });
    });
};

// This is for testing purposes
addBookToLibrary(`Book1`, 'Joshua', '67', '2026-08-29', 'Yes');
addBookToLibrary(`Book2`, 'Joshua', '69', '2026-08-29', 'Not yet');
addBookToLibrary(`Book3`, 'Joshua', '1738', '2026-08-29', 'Yes');
