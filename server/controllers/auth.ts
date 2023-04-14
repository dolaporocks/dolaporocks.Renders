import express, {Request, Response, NextFunction} from "express";
import {GenerateToken, userDisplayName} from "../util";
import User from "../models/user";
import passport from "passport";

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction) : void{
    if(!req.user){
        return res.render('index', { title: 'Login', page: 'login',
                        messages: req.flash('loginMessage'), displayName: userDisplayName(req) });
    }
    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction) : void{
    if(!req.user){
        return res.render('index', { title: 'Register', page: 'register',
                         messages: req.flash('registerMessage'), displayName: userDisplayName(req) });
    }
    return res.redirect('/contact-list');
}

export function DisplayLogoutPage(req: Request, res: Response, next: NextFunction) : void{
    req.logout(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }
        return res.redirect('/login');
    });
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction) : void{

    console.log("HERE HERE" + req.user);
    passport.authenticate('local', function(err: Error, user: Express.User, info: string){

        if(err){
            console.error(err);
            res.end(err);
        }

        if(!user){
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }

        req.logIn(user, function(err){
            if(err){
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);
            console.log(authToken);

            res.redirect('/contact-list');
        });

    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction) : void{

    let newUser = new User({
        username : req.body.username,
        EmailAddress : req.body.emailAddress,
        DisplayName : req.body.firstName + " " + req.body.lastName
    });

    console.log("Username " + req.body.username);
    console.log("Email Address " + req.body.emailAddress);
    console.log("Password " + req.body.password);
    console.log("DisplayName " + req.body.firstName + " " + req.body.lastName);

    User.register(newUser, req.body.password, function(err){
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error("Error : User Already Exists");
                req.flash('registerMessage', "ERROR: User Already Exists");
            }
            console.error("Error : " + err.name);
            req.flash('registerMessage', err.messages);
            return res.redirect('/register');
        }

        return passport.authenticate('local')(req, res, function(){
            return res.redirect('/contact-list');
        });
    });
}