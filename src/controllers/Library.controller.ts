import { Request, Response } from "express";
import { libList } from "../data/libList";
import { Library } from "../models/Library";

export class LibraryContoller {

    public listLibraryByName(req: Request, res: Response) {

        try {

            const {name} = req.query;

            const library = libList.find(item => item.name == name);

            if(!library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            return res.status(200).send({
                ok: true,
                message: 'Bookstore found!',
                data: library
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public listAllLibrary(req: Request, res: Response) {

        try {

            let library = libList;

            let returnLibrary = library.map(lib => {
                return lib.getLibrary();
            })

            return res.status(200).send({
                ok: true,
                message: 'ok',
                data: returnLibrary
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public createLibrary(req: Request, res: Response) {

        try {

            const {name, phone, address} = req.body;

            if(!name) {
                return res.status(400).send({
                    ok: false,
                    message: 'Name not provided!'
                })
            }

            if(!phone) {
                return res.status(400).send({
                    ok: false,
                    message: 'Phone not provided!'
                })
            }

            if(!address) {
                return res.status(400).send({
                    ok: false,
                    message: 'Address not provided!'
                })
            }

            const lib = new Library(name, phone, address);

            libList.push(lib);

            return res.status(201).send({
                ok: true,
                message: 'Bookstore successfully registered!',
                data: lib
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public listLibraryById(req: Request, res: Response) {

        try {

            const {idLib} = req.params;

            const library = libList.find(itme => itme.id == idLib);

            if(!library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            return res.status(200).send({
                ok: true,
                message: 'Bookstore found!',
                data: library
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public editLibrary(req: Request, res: Response) {

        try {

            const {idLib} = req.params;
            const {name, phone, address } = req.body;

            const library = libList.find(item => item.id == idLib);

            if(!library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            if(!name) {
                return res.status(400).send({
                    ok: false,
                    message: 'Name not provided!'
                })
            }

            if(!phone) {
                return res.status(400).send({
                    ok: false,
                    message: 'Phone not provided!'
                })
            }

            if(!address) {
                return res.status(400).send({
                    ok: false,
                    message: 'Address not provided!'
                })
            }

            library.name = name;
            library.address = address;
            library.phone = phone;

            return res.status(200).send({
                ok: true,
                message: 'Bookstore successfully updated!'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public deleteLibrary(req: Request, res: Response) {

        try {

            const {idLib} = req.params;

            const library = libList.findIndex(item => item.id == idLib);

            if(!library) {
                return res.status(404).send({
                    ok: false,
                    message: 'Bookstore not found!'
                })
            }

            libList.splice(library, 1);

            return res.status(200).send({
                ok: true,
                message: 'Bookstore successfully deleted!'
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