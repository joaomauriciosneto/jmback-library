import { NextFunction, Request, Response } from "express";
import { libList } from "../data/libList";

export const libraryValidator = (req: Request, res: Response, next: NextFunction) => {

    const {idLib} = req.params;

    const library = libList.some(item => item.id == idLib);

    if(library) {
        return res.status(400).send({
            ok: false,
            message: 'Bookstore already exists in the system!'
        })
    }
    next();

}