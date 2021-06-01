'use strict';
var gCurrLang = 'en';
var gTrans = {
    title:{
        en : 'Welcome To My BookShop',
        he : 'ברוכים הבאים לחנות הספרים שלי'
    },
    'btn-new-book':{
        en : 'Add A New Book',
        he : 'הוסף ספר חדש'
    },
    'table-title':{
        en : 'Books In Stock',
        he : 'ספרים במלאי'
    },
    'th-id':{
        en : 'Id',
        he : 'מספר פריט'
    },
    'th-name':{
        en : 'Name',
        he : 'שם הספר'
    },
    'th-price':{
        en : 'Price',
        he : 'מחיר'
    },
    'th-actions':{
        en : 'Actions',
        he : 'פעולות'
    },
    'btn-next-page':{
        en : 'Next Page',
        he : 'לדף הבא'
    },
    'btn-prev-page':{
        en : 'prev Page',
        he : 'לדף הקודם'
    },
    'btn-delete':{
        en : 'Delete',
        he : 'מחק'
    },
    'btn-update':{
        en : 'Update',
        he : 'עדכן'
    },
    'btn-read':{
        en : 'Read',
        he : 'עיין'
    },
    'btn-close':{
        en: 'Close',
        he: 'סגור'
    },
    'btn-update':{
        en: 'Update Price',
        he : 'עדכן מחיר'
    },
    'btn-add':{
        en:'Add Book',
        he:'הוסף ספר'
    }
}






function setLang(lang){
    gCurrLang = lang;
}

function doTrans(){
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function(el){
        el.innerText = getTrans(el.dataset.trans)
    })
}

function getTrans(transKey){
    var keyTrans = gTrans[transKey];
    if(!keyTrans){
        return 'UNKNOWN';
    }
    var txt = keyTrans[gCurrLang];
    if(!txt) {
        return keyTrans.en;
    }
    return txt;
}