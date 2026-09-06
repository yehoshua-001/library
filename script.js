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
        library.appendChild(card);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('infoContainer');
        card.appendChild(infoContainer);

        const title = document.createElement('p');
        title.textContent = `Title: ${myLibrary[index].title}`;
        title.classList.add('title');
        infoContainer.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${myLibrary[index].author}`;
        author.classList.add('author');
        infoContainer.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${myLibrary[index].pages}`;
        pages.classList.add('pages');
        infoContainer.appendChild(pages);

        const datePublish = document.createElement('p');
        datePublish.textContent = `Date Published: ${myLibrary[index].datePublish}`;
        datePublish.classList.add('datePublish');
        infoContainer.appendChild(datePublish);

        const readStatus = document.createElement('p');
        readStatus.textContent = `Read: ${myLibrary[index].readStatus}`;
        readStatus.classList.add('readStatus');
        infoContainer.appendChild(readStatus);

        const readBtnContainer = document.createElement('div');
        readBtnContainer.classList.add('readBtnContainer');
        const readBtn = document.createElement('button');
        readBtn.textContent = "Change Read";
        readBtn.classList.add('readBtn');
        readBtn.addEventListener("click", () => {
            book.changeReadStatus();
            displayBookToLibrary();
        });
        readBtnContainer.appendChild(readBtn);
        card.appendChild(readBtnContainer);

        const removeBtnContainer = document.createElement('div');
        removeBtnContainer.classList.add('removeBtnContainer');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('removeBtn');
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBookToLibrary();
        });
        removeBtnContainer.appendChild(removeBtn);
        card.appendChild(removeBtnContainer);
    });
};

// Samples
addBookToLibrary('No Longer Human', 'Osamu Dazai, Donald Keene', '176', '1948-01-25', 'Not yet');
addBookToLibrary('Crime and Punishment', 'Fyodor Dostoevsky', '671', '1866-01-01', 'Not yet');
addBookToLibrary('To Kill a Mocking Bird', 'Harper Lee', '323', '1960-07-11', 'Not yet');
addBookToLibrary('Pride and Prejudice', 'Jane Austen, Anna Quindlen', '279', '1813-01-27', 'Not yet');
addBookToLibrary('1984', 'George Orwell, Thomas Pynchon', '368', '1949-6-8', 'Not yet');
addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupery, Richard Howard', '96', '1943-4-6', 'Not yet');
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', '180', '1925-4-10', 'Not yet');
