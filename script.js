const library = document.querySelector("#library");
const addBookButton = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, hasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBooktoLibrary(title, author, pages, hasRead) {
  myLibrary.push(new Book(title, author, pages, hasRead));
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id == id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

Book.prototype.displayBook = function () {
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  if (!this.hasRead) {
    bookCard.classList.add("unread");
  }

  const title = document.createElement("h2");
  title.textContent = this.title;
  bookCard.appendChild(title);

  const author = document.createElement("p");
  author.textContent = this.author;
  bookCard.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = this.pages + " pages";
  bookCard.appendChild(pages);

  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.add("toggleReadbutton");
  toggleReadButton.textContent = this.hasRead
    ? "Mark as unread"
    : "Mark as read";
    toggleReadButton.addEventListener("click", () => {
      this.toggleRead()
      displayLibrary()
    })
    bookCard.appendChild(toggleReadButton)
  

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteBook(this.id);
    displayLibrary();
  });
  bookCard.appendChild(deleteButton);

  library.appendChild(bookCard);
};

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function displayLibrary() {
  library.innerHTML = "";

  myLibrary.forEach((book) => {
    book.displayBook();
  });
}

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("hasRead").checked;

  addBooktoLibrary(title, author, pages, read);
  displayLibrary();
  dialog.close();
  form.reset();
});

//test books
addBooktoLibrary("Lord Of The Rings", "J.R.R Tolkien", "999", true);
addBooktoLibrary(
  "A Hitchhiker's Guide To The Galaxy",
  "Douglas Adams",
  "888",
  true
);
addBooktoLibrary("The Alchemist", "Paulo Coelho", "111", false);

displayLibrary();
