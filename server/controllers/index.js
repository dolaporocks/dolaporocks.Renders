"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessContactPage = exports.DisplayContactPage = exports.DisplayProductsPage = exports.DisplayServicePage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const util_1 = require("../util");
const contact_1 = __importDefault(require("../models/contact"));
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: (0, util_1.userDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: "about", displayName: (0, util_1.userDisplayName)(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayServicePage(req, res, next) {
    res.render('index', { title: 'Service', page: "service", displayName: (0, util_1.userDisplayName)(req) });
}
exports.DisplayServicePage = DisplayServicePage;
function DisplayProductsPage(req, res, next) {
    res.render('index', { title: 'Products', page: "products", displayName: (0, util_1.userDisplayName)(req) });
}
exports.DisplayProductsPage = DisplayProductsPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Us', page: "contact", displayName: (0, util_1.userDisplayName)(req) });
}
exports.DisplayContactPage = DisplayContactPage;
function ProcessContactPage(req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error("Failed to add contact " + err);
        res.end(err);
    });
}
exports.ProcessContactPage = ProcessContactPage;
//# sourceMappingURL=index.js.map