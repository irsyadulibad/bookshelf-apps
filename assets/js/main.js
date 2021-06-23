// Inisialisasi element ke dalam konstanta
const formInput = document.getElementById('inputBook');
const formSearch = document.getElementById('searchBook');
const bookStatusEl = document.getElementById('bookStatus');
const searchFormType = document.getElementById('searchBookType');
const searchFormInput = document.getElementById('searchBookTitle');
const isCompleteReadEl = document.getElementById('inputBookIsComplete');

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
        let completeList = '';
        let incompleteList = '';
        const keyword = searchFormInput.value;
        const type = searchFormType.value;
        const books = book.getByKeyword(type, keyword);

        books.reverse().forEach(book => {
            const bookElement = generateBookElement(book);

            if(book.isComplete == false) {
                incompleteList += bookElement;
            } else {
                completeList += bookElement;
            }
        });

        incompleteListEl.innerHTML = incompleteList;
        completeListEl.innerHTML = completeList;
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

    searchFormInput.addEventListener('keyup', function() {
        showBooksToElement();
    });
    
    searchFormType.addEventListener('change', function() {
        showBooksToElement();
    });

    showBooksToElement();
});