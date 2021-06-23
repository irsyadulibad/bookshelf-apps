// Inisialisasi element ke dalam konstanta
const formInput = document.getElementById('inputBook');
const isCompleteReadEl = document.getElementById('inputBookIsComplete');
const bookStatusEl = document.getElementById('bookStatus');

const incompleteListEl = document.getElementById('incompleteBookshelfList');
const completeListEl = document.getElementById('completeBookshelfList');
const bookShelfEl = document.querySelectorAll('.book_shelf');

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

    bookShelfEl.forEach(bookShelf => {
        bookShelf.addEventListener('click', function(e) {
            const target = e.target;
    
            if(target.classList.contains('delete-book-button')) {
                if(isConfirmed = confirm('Apakah anda yakin?')) {
                    const id = target.dataset.id;
                    book.delete(id);
                }
            }

            if(target.classList.contains('incomplete-button')) {
                const id = target.dataset.id;
                book.moveShelf(id, false);
            }

            if(target.classList.contains('complete-button')) {
                const id = target.dataset.id;
                book.moveShelf(id, true);
            }

            showBooksToElement();
        });
    });

    showBooksToElement();
});