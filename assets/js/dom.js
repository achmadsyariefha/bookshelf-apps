const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBookList(){
    const incompleteBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completeBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
    
    const bookList = makeBookList(bookTitle, bookAuthor, bookYear, bookIsComplete);
    const bookListObject = composeBookshelfObject(bookTitle, bookAuthor, bookYear, bookIsComplete);

    bookList[BOOK_ITEMID] = bookListObject.id;
    books.push(bookListObject);
    
    if (!bookIsComplete) {
        incompleteBookList.append(bookList);
    } else {
        completeBookList.append(bookList);
    }

    updateDataToStorage();

}

function makeBookList(data, author, year, isComplete) {
    
    const textBookTitle = document.createElement("h3");
    textBookTitle.innerText = data;

    const textBookAuthor = document.createElement("p");
    textBookAuthor.innerText = author;

    const textBookYear = document.createElement("p");
    textBookYear.classList.add("year");
    textBookYear.innerText = year;

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action");
    if (isComplete == false){
        actionContainer.append(createReadCheckButton(), createRemoveBookButton());
    } else {
        actionContainer.append(createUnreadCheckButton(), createRemoveBookButton());
    }
    
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(textBookTitle, textBookAuthor, textBookYear);

    bookItem.append(actionContainer);
    
    return bookItem;
}

function addBookListToCompleted(taskElement) {
    const completeBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskBookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskBookAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskBookYear = taskElement.querySelector(".book_item > .year").innerText;

    const newBookList = makeBookList(taskBookTitle, taskBookAuthor, taskBookYear, true);
    const bookList = findBook(taskElement[BOOK_ITEMID]);
    bookList.isComplete = true;
    newBookList[BOOK_ITEMID] = bookList.id;

    completeBookList.append(newBookList);
    taskElement.remove();

    updateDataToStorage();
}

function removeBookListToCompleted(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    alert("Buku telah berhasil dihapus");
    updateDataToStorage();
}

function undoBookListFromCompleted(taskElement) {
    const incompleteBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskBookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskBookAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskBookYear = taskElement.querySelector(".book_item > .year").innerText;

    const newBookList = makeBookList(taskBookTitle, taskBookAuthor, taskBookYear, false);

    const bookList = findBook(taskElement[BOOK_ITEMID]);
    bookList.isComplete = false;
    newBookList[BOOK_ITEMID] = bookList.id;

    incompleteBookList.append(newBookList);
    taskElement.remove();

    updateDataToStorage();
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function createReadCheckButton() {
    return createButton("green","Selesai dibaca", function (event) {
        addBookListToCompleted(event.target.parentElement.parentElement);
    });
}

function createUnreadCheckButton() {
    return createButton("green","Belum Selesai dibaca", function (event) {
        undoBookListFromCompleted(event.target.parentElement.parentElement);
    });
}

function createRemoveBookButton() {
    return createButton("red","Hapus Buku", function (event) {
        removeBookListToCompleted(event.target.parentElement.parentElement);
    });
}