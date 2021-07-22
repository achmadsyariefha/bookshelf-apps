const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";

function addBookList(){
    const incompleteBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
    
    if (bookIsComplete == false){
        const bookList = makeBookList(bookTitle, bookAuthor, bookYear);
        incompleteBookList.append(bookList);
    }

}

function makeBookList(data, author, year) {
    
    const textBookTitle = document.createElement("h3");
    textBookTitle.innerText = data;

    const textBookAuthor = document.createElement("p");
    textBookAuthor.innerText = "Penulis: "+author;

    const textBookYear = document.createElement("p");
    textBookYear.innerText = "Tahun: "+year;

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action");
    actionContainer.append(createReadCheckButton());
    
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(textBookTitle, textBookAuthor, textBookYear);
    bookItem.append(actionContainer);
    
    return bookItem;
}

function addBookListToCompleted(taskElement) {
    taskElement.remove();
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function createReadCheckButton() {
    return createButton("green", function (event) {
        addBookListToCompleted(event.target.parentElement);
    });
}