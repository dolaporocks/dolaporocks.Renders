"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayLogoutPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = void 0;
const util_1 = require("../util");
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login',
            messages: req.flash('loginMessage'), displayName: (0, util_1.userDisplayName)(req) });
    }
    return res.redirect('/contact-list');
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register',
            messages: req.flash('registerMessage'), displayName: (0, util_1.userDisplayName)(req) });
    }
    return res.redirect('/contact-list');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function DisplayLogoutPage(req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        return res.redirect('/login');
    });
}
exports.DisplayLogoutPage = DisplayLogoutPage;
function ProcessLoginPage(req, res, next) {
    console.log("HERE HERE" + req.user);
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            const authToken = (0, util_1.GenerateToken)(user);
            console.log(authToken);
            res.redirect('/contact-list');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    console.log("Username " + req.body.username);
    console.log("Email Address " + req.body.emailAddress);
    console.log("Password " + req.body.password);
    console.log("DisplayName " + req.body.firstName + " " + req.body.lastName);
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error("Error : User Already Exists");
                req.flash('registerMessage', "ERROR: User Already Exists");
            }
            console.error("Error : " + err.name);
            req.flash('registerMessage', err.messages);
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/contact-list');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
//# sourceMappingURL=auth.js.map