
const myLibrary = [];
const table = document.querySelector("table");
const displayBooks = document.querySelector(".displayBooks");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addBook");
const cancelButton = document.querySelector(".cancel")
const createBook = document.querySelector(".create")
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numberOfPagesInput = document.getElementById("numberOfPages");
function Book(title, author, numberOfPages, doYouReadIt) {
    let index=myLibrary.length;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.doYouReadIt = doYouReadIt;
    this.index=index;
}
showButton.addEventListener("click", () => {
    dialog.showModal();
});
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})
function refreshTheDisplay(){
    table.innerHTML = `
    <caption>Books library</caption>
    <thead>
        <th>Title</th>
        <th>Author</th>
        <th>Number of pages</th>
        <th>Is any one read book</th>
    </thead>
    `
    displayLibrary();
}
displayBooks.addEventListener("click", () => {
    refreshTheDisplay()
})

// deleteButton.addEventListener("click",()=>{
//     myLibrary.forEach(function(book){
//         table.removeChild(book);
//     })
// })
createBook.addEventListener("click", () => {
    var title = titleInput.value;
    var author = authorInput.value;
    var numberOfPages = numberOfPagesInput.value;
    var checkedInput = document.querySelector('input[name = "choose"]:checked');
    var doYouReadIt = checkedInput.value;
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
        const deleteButton = document.createElement("button");
        const change = document.createElement("button");
        table.appendChild(td1);
        table.appendChild(td2);
        table.appendChild(td3);
        table.appendChild(td4);
        table.appendChild(deleteButton);
        table.appendChild(change);
        td1.textContent = element.title;
        td2.textContent = element.author;
        td3.textContent = element.numberOfPages;
        td4.textContent = element.doYouReadIt;
        deleteButton.textContent = "DELETE";
        change.textContent = "CHANGE";
        deleteButton.setAttribute("class", "delete")
        deleteButton.addEventListener("click",()=>{
            myLibrary.splice(book.index,1)
            refreshTheDisplay()
        })
        change.addEventListener("click",()=>{
            if(td4.textContent=="No"){
                td4.textContent="Yes";
                element.doYouReadIt="Yes"
            }else if(td4.textContent=="Yes"){
                td4.textContent="No";
                element.doYouReadIt="No"
            }
            refreshTheDisplay()
        })
    })
    
}





addBookToLibrary("New Day", "Ahmed Waleed", 299, "Yes");
addBookToLibrary("The queen and dragon", "mohamed waleed", 234, "Yes");

console.log(myLibrary);
// const book=document.createElement("tr");
// table.appendChild(book);
// const td1=document.createElement("td");
// table.appendChild(td1);
// td1.textContent="Hello";
// book.style.color='blue';









