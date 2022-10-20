import { v4 as idBook } from "uuid";

export class Books {

    private _idBook: string;

    constructor(
        private _title: string,
        private _category: string
    ){
        this._idBook = idBook();
    }

    public get idBook() {
        return this._idBook;
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get category() {
        return this._category;
    }

    public set category(category: string) {
        this._category = category;
    }

    public getBooks() {
        return {
            id: this._idBook,
            title: this._title,
            category: this._category
        }
    }
}