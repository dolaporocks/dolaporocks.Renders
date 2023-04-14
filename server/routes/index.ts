import express from 'express';
const router = express.Router();
import Contact from "../models/contact";

import passport from "passport";
import User from "../models/user";
import {AuthGuard, userDisplayName} from "../util";
import {
  DisplayAboutPage,
  DisplayContactPage,
  DisplayHomePage,
  DisplayProductsPage,
  DisplayServicePage, ProcessContactPage
} from "../controllers";

/* GET home page. */
/************ TOP LEVEL ROUTES ************/
router.get('/', DisplayHomePage);
//firstname, lastname
router.get('/home', DisplayHomePage);
router.get('/about', DisplayAboutPage);
router.get('/service', DisplayServicePage);
router.get('/products', DisplayProductsPage);
router.get('/contact', DisplayContactPage);
router.post('/contact', ProcessContactPage);

export default router;
