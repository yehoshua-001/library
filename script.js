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

// Test (check console output)
addBookToShelf(`book1`, `joshua`, `67`, `1738`, true);
addBookToShelf(`book2`, `joshua`, `69`, `2026`, false);
bookShelf.forEach(book => console.table(book));
