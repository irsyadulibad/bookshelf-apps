// Inisialisasi element ke dalam konstanta
const formInput = document.getElementById('inputBook');
const isCompleteReadEl = document.getElementById('inputBookIsComplete');
const bookStatusEl = document.getElementById('bookStatus');

const incompleteListEl = document.getElementById('incompleteBookshelfList');
const completeListEl = document.getElementById('completeBookshelfList');

window.addEventListener('load', function() {
    if(typeof(Storage) == undefined) {
        alert('Maaf, aplikasi ini tidak didukung oleh browser anda');
        return false;
    }

    const book = new Book;

    // Inisialisasi Fungsi
    function showBooksToElement() {
        const completeBooks = book.getComplete().reverse();
        let completeBooksEl = '';
        const inCompleteBooks = book.getIncomplete().reverse();
        let inCompleteBooksEl = '';

        completeBooks.forEach(book => {
            completeBooksEl += generateBookElement(book);
        });

        inCompleteBooks.forEach(book => {
            inCompleteBooksEl += generateBookElement(book);
        });

        incompleteListEl.innerHTML = inCompleteBooksEl;
        completeListEl.innerHTML = completeBooksEl;
    }

    isCompleteReadEl.addEventListener('change', function(e) {
        switch(this.checked) {
            case true:
                bookStatusEl.innerText = 'Sudah selesai dibaca';
            break;
            case false:
                bookStatusEl.innerText = 'Belum selesai dibaca';
            break;
        }
    });

    formInput.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(this);
        const isComplete = isCompleteReadEl.checked;
        book.insert(data.get('title'), data.get('author'), data.get('year'), isComplete);

        showBooksToElement();
    });

    showBooksToElement();
});