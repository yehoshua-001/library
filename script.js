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

function addBookToShelf(title, author, pages, datePublish, readStatus){
    const book = new Book(title, author, pages, datePublish, readStatus);
    bookShelf.push(book);
}

const form = document.querySelector('#form');
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const datePublish = document.querySelector('#datePublish').value;
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    addBookToShelf(title, author, pages, datePublish, readStatus);
    form.reset();

    // Test (check console output)
    bookShelf.forEach(book => console.table(book));    
});

