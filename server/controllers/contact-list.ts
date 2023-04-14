import express, {Request, Response, NextFunction} from "express";
import {userDisplayName} from "../util";
import {AuthGuard} from "../util";
import Contact from "../models/contact";

export function DisplayContactListPage(req: Request, res: Response, next: NextFunction) : void{
    Contact.find().then(function(contacts ){
        console.log(contacts);
        res.render('index', { title: 'Contact List', page: "contact-list",
            contacts: contacts, displayName: userDisplayName(req) });
        //console.log(data);
    }).catch(function(err){
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction){
    res.render('index', { title: 'Add Contact', page: "edit",
        contact: "", displayName: userDisplayName(req) });
}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction){
    let id = req.params.id

    Contact.findById(id).then(function(contactToEdit){
        res.render('index', { title: 'Edit', page: "edit",
            contact: contactToEdit, displayName: userDisplayName(req) });
    }).catch(function(err){
        console.error("Failed to retrieve contact from database " + err);
        res.end();
    });
}

export function ProcessEditPage(req: Request, res: Response, next: NextFunction){
    let id = req.params.id

    let updatedContact = new Contact(
        {
            "_id" : id,
            "FullName" : req.body.fullName,
            "ContactNumber" : req.body.contactNumber,
            "EmailAddress" : req.body.emailAddress
        }
    );

    Contact.updateOne({_id: id}, updatedContact).then(function(){

        res.redirect('/contact-list');

    }).catch(function(err){
        console.error("Failed to edit contact " + err);
        res.end(err);
    });
}

export function ProcessAddPage(req: Request, res: Response, next: NextFunction){
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

export function ProcessDeletePage(req: Request, res: Response, next: NextFunction){
    let id = req.params.id

    Contact.deleteOne({_id: id}).then(function(){
        res.redirect("/contact-list");

    }).catch(function(err){
        console.error("Failed to retrieve contact from database " + err);
        res.end();
    });
}