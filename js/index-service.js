'use strict';
var gBooks;
var STORAGE_KEY = 'booksDB';
var gSortBy = 'NAME';
const PAGE_SIZE = 3;
var gPageIdx = 0;



function createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY);
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            {
                id: getRandomId() + '',
                name: 'Harry Potter',
                price: 29.90,
                imgUrl: './assets/HarryPotter.jpg',
                rate: 0
            },
            {
                id: getRandomId() + '',
                name: 'Rich Dad Poor Dad',
                price: 49.90,
                imgUrl: './assets/RichDad.jpg',
                rate: 0
            },
            {
                id: getRandomId() + '',
                name: 'The Wealth Choice',
                price: 39.90,
                imgUrl: './assets/WealthChoice.jpg',
                rate: 0
            }
        ]
        _saveBooks();
    }
}

function getBooksForDisplay(){
    var startIdx = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(startIdx , startIdx+PAGE_SIZE)
    sortBooksBy();
    return books;
}

function movePage(diff){
    gPageIdx += diff;
    if (gPageIdx < 0) {
        gPageIdx -= diff
        return;
    } 
    if(gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
    return gPageIdx;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) { return (book.id === bookId + '') })
    console.log('bookIdx', bookIdx);
    console.log(gBooks.splice(bookIdx, 1))
}

function addBook(name, price) {
    var book = {
        id: getRandomId() + '',
        name: name,
        price: +price,
        imgUrl: './assets/HarryPotter.jpg',
        rate: 0
    }
    gBooks.push(book);
    _saveBooks();
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId + '';
    })
    book.price = +(newPrice);
    _saveBooks();
}

function sortBooksBy() {
    if (gSortBy === 'NAME') {
        gBooks.sort((a, b) => {
            return (a.name > b.name) ? 1 : -1;
        })
    } else if (gSortBy === 'PRICE') {
        gBooks.sort((a, b) => a.price - b.price);
    }
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId + '';
    })
}

function changeRate(diff, bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId + '';
    })
    book.rate += diff;
    _saveBooks();
    return book.rate;
}

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks);
}