let myLibrary = [];
let newBook = new Book('test','author',100, false);
myLibrary.push(newBook);

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

}

Book.prototype.toggleRead = function(   ) {
    this.read = !this.read;
    displayLibrary();
}

function addBookToLibrary() {
    let data = document.getElementById('newBookForm')
    
    let newBook = new Book(data.elements['title'].value,
     data.elements['author'].value, 
     data.elements['pages'].value,
    data.elements['read'].checked)
    
  myLibrary.push(newBook)

  displayLibrary();
}

function displayLibrary() {
    refreshTable();

    let table = document.querySelector('.table'); 

    for (let index = 0; index < myLibrary.length; index++) {
        let row = createRow(myLibrary[index], index)
        table.appendChild(row)
        
    }
}

const createRow = (book, index) => {
    let row = document.createElement('tr');
    row.dataset.bookId = index;

    let bookProperties = Object.getOwnPropertyNames(book);

    bookProperties.forEach(name => {
        let data = document.createElement('td');
        data.value = book[name];
        data.textContent = book[name];
        row.appendChild(data);
    })

    let toggleRead = document.createElement('button');
    toggleRead.textContent = "Mark " + (book.read ? "Unread" : "Read");
    toggleRead.onclick = function() { book.toggleRead()};
    row.appendChild(toggleRead);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Remove Book";
    deleteButton.onclick = function() {deleteBook(this)};
    row.appendChild(deleteButton);
    return row;
}

function refreshTable() {
    let rows = document.querySelectorAll(".table > tr:not(:first-child)");
    rows.forEach(row => {
        row.remove();
    })
}

function clearInputs() {

}

function deleteBook(el) {
    let id = parseInt(el.parentElement.dataset.bookId)
    myLibrary.splice(id,1)
    displayLibrary();
}

displayLibrary();
