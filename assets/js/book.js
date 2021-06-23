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

    /**
     * Get the Book by ID
     * @param {Number} id - Book's ID
     * @returns {Object, Number} - Book's data, Book's index
     */
    getById(id) {
        const books = this.getAll();
        const index = books.findIndex(book => book.id == id);
        const book = books.find(book => book.id == id);
        
        return {
            book,
            index
        }
    }

    /**
     * Get the Book by Title
     * @param {String} type - Keyword's type
     * @param {String} title - Book's title
     */
    getByKeyword(type, keyword) {
        keyword = new RegExp(keyword, 'i');
        const books = this.getAll();
        
        switch(type) {
            case 'title':
                return books.filter(book => book.title.match(keyword));
            break;
            case 'author':
                return books.filter(book => book.author.match(keyword));
            break;
            case 'year':
                return books.filter(book => book.year.match(keyword));
            break;
            default:
                return books.filter(book => book.title.match(keyword) || book.author.match(keyword) || book.year.match(keyword));
            break;
        }
    }

    /**
     * Move a Book to Specific Shelf
     * @param {Number} id - Book's ID
     * @param {Boolean} isComplete - Is Read Complete
     */
    moveShelf(id, isComplete) {
        const books = this.getAll();
        const index = this.getById(id).index;
        books[index].isComplete = isComplete;

        return localStorage.setItem('books', JSON.stringify(books));
    }
    
    /**
     * Delete Book by ID
     * @param {Number} id - Book's ID
     */
    delete(id) {
        const books = this.getAll();
        const index = this.getById(id).index;
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
                <button class="green incomplete-button" data-id="${book.id}">Belum selesai di Baca</button>
                <button class="red delete-book-button" data-id="${book.id}">Hapus buku</button>
            </div>
        `;
    } else {
        actionEl = `
            <div class="action">
                <button class="green complete-button" data-id="${book.id}">Selesai dibaca</button>
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
