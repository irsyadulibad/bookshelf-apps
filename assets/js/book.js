/*
| Bookshelf Apps 
| * Dicoding Submission *
| (c) 2021 - Ahmad Irsyadul Ibad
*/

class Book {
    constructor() {
        if(localStorage.getItem('books') === null) {
            localStorage.setItem('books', '[]');
        }
    }

    /**
     * Insert the book to local storage
     * @param {string} title - Book Title
     * @param {string} author - Book Author
     * @param {number} year - Book Year
     * @param {Boolean} isComplete - Is Read Complete
     */
    insert(title, author, year, isComplete) {
        const books = this.getAll();
        const book = {
            id: Date.now(),
            title,
            author,
            year,
            isComplete
        }

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    getAll() {
        return JSON.parse(localStorage.getItem('books'));
    }

    getComplete() {
        const books = this.getAll();
        return books.filter(book => book.isComplete == true);
    }

    getIncomplete() {
        const books = this.getAll();
        return books.filter(book => book.isComplete == false);
    }
    
    /**
     * Delete Book by ID
     * @param {Number} id - Book's ID
     */
    delete(id) {
        const books = this.getAll();
        const index = books.findIndex(book => book.id == id);
        books.splice(index, 1);

        return localStorage.setItem('books', JSON.stringify(books));
    }
}

/**
 * Generate HTML Book Element
 * @param {Object} book
 * @returns {String} Book Element
 */
function generateBookElement(book) {
    let actionEl = '';

    if(book.isComplete) {
        actionEl = `
            <div class="action">
                <button class="green">Belum selesai di Baca</button>
                <button class="red delete-book-button" data-id="${book.id}">Hapus buku</button>
            </div>
        `;
    } else {
        actionEl = `
            <div class="action">
                <button class="green">Selesai dibaca</button>
                <button class="red delete-book-button" data-id="${book.id}">Hapus buku</button>
            </div>
        `;
    }

    return `
        <article class="book_item">
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>

            ${actionEl}
        </article>
    `;
}
