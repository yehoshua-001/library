const bookShelf = [];

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

function addBookToShelf(title, author, pages, datePublish, readStatus){
    const book = new Book(title, author, pages, datePublish, readStatus);
    bookShelf.push(book);
    // Books displayed on the shelves after submitting
    const lastBook = bookShelf[bookShelf.length - 1];
    const bookDesign = document.createElement('div');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    bookDesign.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    bookDesign.classList.add('book');
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `${lastBook.title}`
    bookTitle.classList.add('book-title');
    // Conditional statements for books which shelves to occupy
    if(shelf1.children.length != 14){
        occupyShelf1(bookDesign, bookTitle);
    }
    else if(shelf1.children.length == 14 && shelf2.children.length != 14){
        occupyShelf2(bookDesign, bookTitle);
    }
    else if(shelf2.children.length == 14 && shelf3.children.length != 14){
        occupyShelf3(bookDesign, bookTitle);
    }
}

function occupyShelf1(bookDesign, bookTitle){
    shelf1.appendChild(bookDesign);
    bookDesign.appendChild(bookTitle);
}
function occupyShelf2(bookDesign, bookTitle){
    shelf2.appendChild(bookDesign);
    bookDesign.appendChild(bookTitle);
}
function occupyShelf3(bookDesign, bookTitle){
    shelf3.appendChild(bookDesign);
    bookDesign.appendChild(bookTitle);
}

const form = document.querySelector('#form');
const dialog = document.querySelector('#dialog');
const closeBtn = document.querySelector('#closeBtn');
const cancelBtn = document.querySelector('#cancelBtn');

closeBtn.addEventListener("click", () => {
    form.reset();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const datePublish = document.querySelector('#datePublish').value;
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    addBookToShelf(title, author, pages, datePublish, readStatus);
    form.reset();
    dialog.close();
});

// This is just a test
for (let i = 1; i < 30; i++){
    addBookToShelf(`Book${i}`, 'Joshua', '67', '2026-08-29', 'not read yet');
};