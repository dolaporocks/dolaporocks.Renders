import express from 'express';
const router = express.Router();

import {
    DisplayLoginPage,
    DisplayLogoutPage,
    DisplayRegisterPage,
    ProcessLoginPage,
    ProcessRegisterPage
} from "../controllers/auth";

/************ AUTHENTICATION ROUTES ************/
router.get('/login', DisplayLoginPage);

router.post('/login', ProcessLoginPage);

router.get('/logout', DisplayLogoutPage);

router.get('/register', DisplayRegisterPage);

router.post('/register', ProcessRegisterPage);

export default router;
