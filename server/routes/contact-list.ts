import express from 'express';
const router = express.Router();
import Contact from "../models/contact";

import passport from "passport";
import User from "../models/user";
import {AuthGuard, userDisplayName} from "../util";
import {
    DisplayContactListPage,
    DisplayAddPage, DisplayEditPage, ProcessEditPage, ProcessDeletePage, ProcessAddPage
} from "../controllers/contact-list";
/********** CONTACT LIST ROUTES *********/
router.get('/contact-list', DisplayContactListPage);

router.get('/edit/:id', AuthGuard, DisplayEditPage);

router.post('/edit/:id', AuthGuard, ProcessEditPage);

router.get('/add', AuthGuard, DisplayAddPage);

router.post('/add', AuthGuard, ProcessAddPage);

router.get('/delete/:id', AuthGuard, ProcessDeletePage);

export default router;
