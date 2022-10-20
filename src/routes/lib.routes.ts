import { Router } from "express";
import { BooksContoller } from "../controllers/Books.contoller";
import { LibraryContoller } from "../controllers/Library.controller";

export const libRouter = Router();

libRouter.get('/', new LibraryContoller().listAllLibrary);

libRouter.get('/:idLib', new LibraryContoller().listLibraryById);

// essa rota está errada!
libRouter.get('/name', new LibraryContoller().listLibraryByName);

libRouter.post('/', new LibraryContoller().createLibrary);

libRouter.put('/:idLib', new LibraryContoller().editLibrary);

libRouter.delete('/:idLib', new LibraryContoller().deleteLibrary);

libRouter.post('/book/:idLib', new BooksContoller().createBook);

libRouter.get('/book/:idLib', new BooksContoller().listBookById);