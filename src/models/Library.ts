import { v4 as idLibrary } from "uuid";
import { Books } from "./Books";

export class Library {

    private _idLibrary: string;

    constructor(
        private _name: string,
        private _phone: number,
        private _address: string,
        private _books?: Books[]
    ){
        this._idLibrary = idLibrary(), 
        this._books = this._books ?? []
    }

    public get id() {
        return this._idLibrary;
    }

    public get books() {
        return this._books;
    }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get phone() {
        return this._phone;
    }

    public set phone(phone: number) {
        this._phone = phone;
    }

    public get address() {
        return this._address;
    }

    public set address(address: string) {
        this._address = address;
    }

    public getLibrary() {
        return {
            id: this._idLibrary,
            name: this._name,
            address: this._address,
            phone: this._phone,
            books: this._books
        }
    }

}