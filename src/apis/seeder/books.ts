import BooksRepository from "../../database/repository/Books";
import GenresRepository from "../../database/repository/Genres";

const books = [
    {
        title: 'The Lord of the Rings',
        author: 'J. R. R. Tolkien',
        genre: 'Fantasy',
        dop: new Date('1954-07-29'),
        availableCopies: 5,
    },
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        genre: 'Fantasy',
        dop: new Date('1937-09-21'),
        availableCopies: 5,
    },
    {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J. K. Rowling',
        genre: 'Fantasy',
        dop: new Date('1997-06-26'),
        availableCopies: 5,
    },
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J. K. Rowling',
        genre: 'Fantasy',
        dop: new Date('1998-07-02'),
        availableCopies: 5,
    },
    {
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J. K. Rowling',
        genre: 'Fantasy',
        dop: new Date('1999-07-08'),
        availableCopies: 5,
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        dop: new Date('1813-01-28'),
        availableCopies: 5,
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Novel',
        dop: new Date('1960-07-11'),
        availableCopies: 5,
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Novel',
        dop: new Date('1925-04-10'),
        availableCopies: 5,
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J. D. Salinger',
        genre: 'Novel',
        dop: new Date('1951-07-16'),
        availableCopies: 5,
    },
    {
        title: 'war and peace',
        author: 'Leo Tolstoy',
        genre: 'Novel',
        dop: new Date('1869-01-01'),
        availableCopies: 5,
    },
];

export async function seedBooks() {
    try {
        for (let idx = 0; idx < books.length; idx++) {
            const book = books[idx];
            const genre = await GenresRepository.getGenreByName(book.genre);
            if (genre instanceof Error) {
                console.log(genre);
                continue;
            }
            if(!genre) {
                console.log(`Genre ${book.genre} not found`);
                continue
            }
            const newBook = await BooksRepository.createBook({
                title: book.title,
                author: book.author,
                genre: genre._id,
                dop: book.dop,
                availableCopies: book.availableCopies,
            });
            if (newBook instanceof Error) {
                console.log(newBook);
                return;
            }
        }
        console.log('Books seeded');
    } catch (error) {
        console.log(error);
    }
}