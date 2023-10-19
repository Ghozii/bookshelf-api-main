// Studi Kasus : Buku API - Dicoding
// DHIYAUDDIN AL GHOZI

const { nanoid } = require('nanoid');

const books = [];

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // Validasi input
    if (!name) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            })
            .code(400);
    }

    if (readPage > pageCount) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);
    }

    // Generate ID menggunakan nanoid
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
        finished,
    };

    // Tambahkan buku baru ke dalam array books
    books.push(newBook);

    return h
        .response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })
        .code(201);
};

const getAllBooksHandler = (request, h) => {
    // Ambil seluruh buku dan hanya kembalikan informasi yang diperlukan
    const response = {
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
    return h.response(response).code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (book) {
        return h
            .response({
                status: 'success',
                data: {
                    book,
                },
            })
            .code(200);
    }

    return h
        .response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        })
        .code(404);
};

const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // Validasi input
    if (!name) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            })
            .code(400);
    }

    if (readPage > pageCount) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);
    }

    const index = books.findIndex((b) => b.id === bookId);

    if (index !== -1) {
        // Perbarui buku jika ID ditemukan
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt: new Date().toISOString(),
            finished: pageCount === readPage,
        };

        return h
            .response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            })
            .code(200);
    } else {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            })
            .code(404);
    }
};


const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((b) => b.id === bookId);

    if (index !== -1) {
        books.splice(index, 1); // Hapus buku jika id ditemukan
        return h
            .response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            })
            .code(200);
    }

    return h
        .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan', // Pesan yang diperbaiki
        })
        .code(404);
};


module.exports = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];