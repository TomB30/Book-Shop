'use strict';
var gCurrBookToUpdateId = null;

function onInit() {
    createBooks();
    renderBooks();
}


function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = books.map(function (book) {
        return `<tr>
        <td class="align-middle">${book.id}</td>
        <td class="align-middle">${book.name}</td>
        <td class="align-middle">${Intl.NumberFormat(gCurrLang, {
            style: 'currency',
            currency: gCurrCurrency,
        }).format(book.price)}</td>
        <td><button class="btn btn-info" data-trans="btn-read" onclick="onOpenCard(${book.id})">Read</button></td>
        <td><button class="btn btn-warning" data-trans="btn-update" onclick="onUpdateModal(${book.id})">Update</button></td>
        <td><button class="btn btn-danger" data-trans="btn-delete" onclick="onRemoveBook(${book.id})">Delete</button></td>
        </tr>`
    }).join('')  
    document.querySelector('.books-container').innerHTML = strHTML;
    doTrans();
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onOpenModal() {
    $('.modal-add-bg').removeClass('hide')
}

function onAddBook(ev) {
    ev.preventDefault();
    var bookName = $('.book-name').val();
    var bookPrice = $('.book-price').val();
    if (bookName && bookPrice) {
        addBook(bookName, bookPrice)
        renderBooks();
    } else {
        alert('All Fields Are Required!')
    }
    $('.book-name').val('');
    $('.book-price').val('');
    $('.modal-add-bg').addClass('hide');
}

function onUpdateModal(bookId) {
    $('.modal-update-bg').removeClass('hide');
    gCurrBookToUpdateId = bookId;
}

function onUpdateBook(ev) {
    ev.preventDefault();
    var newPrice = $('.book-price-update').val();
    if(!newPrice) alert('Invalid Input!');
    else{
        updateBook(gCurrBookToUpdateId, newPrice);
        renderBooks();
        $('.modal-update-bg').addClass('hide')
        $('.book-price-update').val('');
    }
}

function onSetSort(sortBy){
    setSort(sortBy);
    sortBooksBy();
    renderBooks();
}

function onMovePage(diff){
    $('.curr-page').text(movePage(diff)+1);
    renderBooks();
}

function onOpenCard(bookId) {
    var book = getBookById(bookId);
    var strHTML = `<div class="card mx-auto" style="width: 18rem;">
        <img src="${book.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <button class="btn btn-secondary" onclick="onChangeRate(1, ${book.id})">+</button>
            <span class="rate-span">${book.rate}</span>
            <button class="btn btn-secondary" onclick="onChangeRate(-1, ${book.id})">-</button>
            <br>
            <button class="btn btn-primary" data-trans="btn-close" onclick="onHideCard()">Close</button>
        </div>
    </div>`;
    $('.card-bg').html(strHTML);
    $('.card-bg').removeClass('hide');
    doTrans()
}

function onChangeRate(diff, bookId) {
    var updatedRate = changeRate(diff, bookId);
    $('.rate-span').text(updatedRate);
}

function onHideCard(){
    $('.card-bg').addClass('hide');
    $('.modal-update-bg').addClass('hide');
    $('.modal-add-bg').addClass('hide');
}

function onSetLang(currLang){
    setLang(currLang);
    renderBooks()
}