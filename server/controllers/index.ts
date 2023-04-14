import express, {Request, Response, NextFunction} from "express";
import {userDisplayName} from "../util";
import Contact from "../models/contact";

export function DisplayHomePage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Home', page: "home", displayName: userDisplayName(req)});
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'About Us', page: "about", displayName: userDisplayName(req) });
}

export function DisplayServicePage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Service', page: "service", displayName: userDisplayName(req) });
}

export function DisplayProductsPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Products', page: "products", displayName: userDisplayName(req) });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Contact Us', page: "contact", displayName: userDisplayName(req) });
}
export function ProcessContactPage(req: Request, res: Response, next: NextFunction) : void
{
    let newContact = new Contact(
        {
            "FullName" : req.body.fullName,
            "ContactNumber" : req.body.contactNumber,
            "EmailAddress" : req.body.emailAddress
        }
    );

    Contact.create(newContact).then(function(){

        res.redirect('/contact-list');

    }).catch(function(err){
        console.error("Failed to add contact " + err);
        res.end(err);
    });
}