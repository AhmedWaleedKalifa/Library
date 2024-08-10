
class Library {
    constructor() {
        this.table = document.querySelector("table");
        this.displayBooksButton = document.querySelector(".displayBooks");
        this.dialog = document.querySelector("dialog");
        this.showButton = document.querySelector(".addBook");
        this.cancelButton = document.querySelector(".cancel");
        this.createBookButton = document.querySelector(".create");
        this.titleInput = document.getElementById("title");
        this.authorInput = document.getElementById("author");
        this.numberOfPagesInput = document.getElementById("numberOfPages");

        this.myLibrary = this.loadLibrary() || [];
        this.count = 0;
        this.counter = -1;

        this.setupEventListeners();
    }

    loadLibrary() {
        return JSON.parse(localStorage.getItem("myLibrary"));
    }

    saveLibrary() {
        localStorage.setItem("myLibrary", JSON.stringify(this.myLibrary));
    }

    addBookToLibrary(title, author, numberOfPages, doYouReadIt, index) {
        const newBook = new Book(title, author, numberOfPages, doYouReadIt, index);
        this.myLibrary.push(newBook);
        this.saveLibrary();
    }

    refreshTheDisplay() {
        this.table.innerHTML = `
            <caption>Books library</caption>
            <thead>
                <th>Num</th>
                <th>Title</th>
                <th>Author</th>
                <th>Number of pages</th>
                <th>Is any one read book</th>
                <th>Delete</th>
                <th>Change</th>
            </thead>
        `;
        this.displayLibrary();
    }

    displayLibrary() {
            this.myLibrary.forEach((element, index) => {
            const book = document.createElement("tr");
            this.table.appendChild(book);

            const td0 = document.createElement("td");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");

            const deleteButton = document.createElement("button");
            const changeButton = document.createElement("button");

            td0.textContent = index + 1;
            td1.textContent = element.title;
            td2.textContent = element.author;
            td3.textContent = element.numberOfPages;
            td4.textContent = element.doYouReadIt;

            td4.style.color = td4.textContent === "No" ? "red" : "green";

            deleteButton.textContent = "DELETE";
            changeButton.textContent = "CHANGE";

            td5.classList.add("deleteContainer");
            td6.classList.add("changeContainer");

            deleteButton.classList.add("delete");
            changeButton.classList.add("change");

            td5.appendChild(deleteButton);
            td6.appendChild(changeButton);

            book.appendChild(td0);
            book.appendChild(td1);
            book.appendChild(td2);
            book.appendChild(td3);
            book.appendChild(td4);
            book.appendChild(td5);
            book.appendChild(td6);

            deleteButton.addEventListener("click", () => {
                this.myLibrary.splice(index, 1);
                this.refreshTheDisplay();
                this.saveLibrary();
            });

            changeButton.addEventListener("click", () => {
                element.doYouReadIt = element.doYouReadIt === "No" ? "Yes" : "No";
                this.refreshTheDisplay();
                this.saveLibrary();
            });
        });
    }

    setupEventListeners() {
        this.showButton.addEventListener("click", () => {
            this.dialog.showModal();
        });

        this.cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.dialog.close();
        });

        this.displayBooksButton.addEventListener("click", () => {
            this.count++;
            if (this.count % 2 !== 0) {
                this.refreshTheDisplay();
            } else {
                this.table.innerHTML = "";
            }
        });

        this.createBookButton.addEventListener("click", () => {
            this.counter++;
            const title = this.titleInput.value;
            const author = this.authorInput.value;
            const numberOfPages = this.numberOfPagesInput.value;
            const checkedInput = document.querySelector('input[name="choose"]:checked');
            const doYouReadIt = checkedInput.value;

            this.titleInput.value = "";
            this.authorInput.value = "";
            this.numberOfPagesInput.value = "";
            checkedInput.checked = false;

            this.addBookToLibrary(title, author, numberOfPages, doYouReadIt, this.counter);
            this.dialog.close();
            this.refreshTheDisplay();
        });
    }
}

class Book {
    constructor(title, author, numberOfPages, doYouReadIt, index) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.doYouReadIt = doYouReadIt;
        this.index = index;
    }
}

const myLibraryApp = new Library();
