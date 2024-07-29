

const table = document.querySelector("table");
const displayBooks = document.querySelector(".displayBooks");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addBook");
const cancelButton = document.querySelector(".cancel")
const createBook = document.querySelector(".create")
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numberOfPagesInput = document.getElementById("numberOfPages");

const myLibrary = [];
var count = 0;

function Book(title, author, numberOfPages, doYouReadIt) {
    let index = myLibrary.length;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.doYouReadIt = doYouReadIt;
    this.index = index;
}

showButton.addEventListener("click", () => {
    dialog.showModal();
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})

function refreshTheDisplay() {
    table.innerHTML = `
    <caption>Books library</caption>
    <thead>
        <th>Title</th>
        <th>Author</th>
        <th>Number of pages</th>
        <th>Is any one read book</th>
        <th>Delete</th>
        <th>Change</th>
    </thead>
    `
    displayLibrary();
}

displayBooks.addEventListener("click", () => {
    count++;
    if (count % 2 != 0) {
        refreshTheDisplay();
    } else {
        table.innerHTML = ""
    }
})


createBook.addEventListener("click", () => {
    var title = titleInput.value;
    var author = authorInput.value;
    var numberOfPages = numberOfPagesInput.value;
    var checkedInput = document.querySelector('input[name = "choose"]:checked');
    var doYouReadIt = checkedInput.value;
    titleInput.value="";
    authorInput.value="";
    numberOfPagesInput.value="";
    checkedInput.value="";
    addBookToLibrary(title, author, numberOfPages, doYouReadIt);
    dialog.close();
    refreshTheDisplay()
})


function addBookToLibrary(title, author, numberOfPages, doYouReadIt) {
    const newBook = new Book(title, author, numberOfPages, doYouReadIt);
    myLibrary.push(newBook)
}

function displayLibrary() {
    myLibrary.forEach(function (element) {
        const book = document.createElement("tr");
        table.appendChild(book);
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const deleteButton = document.createElement("button");
        const change = document.createElement("button");
        table.appendChild(td1);
        table.appendChild(td2);
        table.appendChild(td3);
        table.appendChild(td4);
        table.appendChild(td5);
        table.appendChild(td6);
        td5.appendChild(deleteButton);
        td6.appendChild(change);
        td1.textContent = element.title;
        td2.textContent = element.author;
        td3.textContent = element.numberOfPages;
        td4.textContent = element.doYouReadIt;
        deleteButton.textContent = "DELETE";
        change.textContent = "CHANGE";
        td5.setAttribute("class", "deleteContainer");
        td6.setAttribute("class", "changeContainer");

        deleteButton.setAttribute("class", "delete")
        change.setAttribute("class", "change")

        deleteButton.addEventListener("click", () => {
            myLibrary.splice(book.index, 1)
            refreshTheDisplay()
        })
        change.addEventListener("click", () => {
            if (td4.textContent == "No") {
                td4.textContent = "Yes";
                element.doYouReadIt = "Yes"
            } else if (td4.textContent == "Yes") {
                td4.textContent = "No";
                element.doYouReadIt = "No"
            }
            refreshTheDisplay()
        })
    })

}





addBookToLibrary("Pride and Prejudice", "Jane Austen ", 299, "Yes");
addBookToLibrary("War and Peace", "Leo Tolstoy", 444, "No");
addBookToLibrary("The Glass Palace", "Amitav Ghosh", 177, "No");
addBookToLibrary("Q & A", "Vikas Swarup", 97, "Yes");

console.log(myLibrary);










