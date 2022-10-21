import { Request, Response } from "express";
import { libList } from "../data/libList";
import { Books } from "../models/Books";

export class BooksContoller {

    public createBook(req: Request, res: Response) {

        try {

            const {idLib} = req.params;
            const {title, category} = req.body;

            if(!title) {
                return res.status(400).send({
                    ok: false,
                    message: 'Title not provided!'
                })
            }

            if(!category) {
                return res.status(400).send({
                    ok: false,
                    message: 'Category not provided!'
                })
            }

            const books = new Books(title, category);
            const Library = libList.find(item => item.id == idLib);

            if(!Library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            Library.books?.push(books);

            return res.status(201).send({
                ok: true,
                message: 'Book successfully added!',
                data: books
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public listBookById(req: Request, res: Response) {

        try {

            const {idLib} = req.params;
            const {title, category} = req.body;

            const lib = libList.find(item => item.id == idLib)

            if(!lib) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            let library = lib.books || [];

            if(title) {
                library = library.filter(item => item.title = title);
            }

            if(category) {
                library = library.filter(item => item.category = category);
            }

            return res.status(200).send({
                library: lib.name,
                books: library.map(item => {
                    return {
                        item: item.title,
                        category: item.category
                    }
                })
            })

            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public editBook(req: Request, res: Response) {

        try {

            const {idBook, idLib} = req.params;
            const {title, category} = req.body;

            const lib = libList.find(item => item.id == idLib);

            if(!lib) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            const book = lib.books?.find(item => item.idBook == idBook);

            if(!book) {
                return res.status(404).send({
                    ok: false,
                    message: 'Book not found!'
                })
            }

            book.title = title;
            book.category = category;

            return res.status(200).send({
                ok: true,
                message: 'Book successfully updated!',
                data: book
            })

            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public deleteBook(req: Request, res: Response) {

        try {

            const {idLib, idBook} = req.params;

            const library = libList.find(item => item.id == idLib);

            if(!library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            const book = library.books
            ? library.books.findIndex(item => item.idBook == idBook)
            : -1;

            if(book < 0) {
                return res.status(404).send({
                    ok: false,
                    message: 'Book not found!'
                })
            }

            library.books?.splice(book, 1)

            return res.status(200).send({
                ok: true,
                message: 'Book successfully deleted!'
            })
            
        } catch (error: any) {
         
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

}