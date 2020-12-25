const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const dataBase = require("../registration-database/registration-database");
const authorization = require("../authorization/authorization")
const {getAllAddressList} = require("../utils");
const {deleteInfo} = require("../address-list-manipulation-module /address-list-manipulation-module");
const {searchUserInfo} = require("../address-list-manipulation-module /address-list-manipulation-module");
const {addUserInfo} = require("../address-list-manipulation-module /address-list-manipulation-module");
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/registration', async function (req, res) {
    let userInfo = req.body;
    try {
        let msg = await dataBase.addUserRegistrationInformation(userInfo);
        res.send(msg)
    } catch (error) {
        res.send(error)
    }
});


router.post('/add', async function (req, res) {
    let userInfo = req.body;
    try {
        let msg = await addUserInfo(userInfo);
        res.send(msg)
    } catch (error) {
        res.send(error)
    }
});

router.post('/search', async function (req, res) {
    let userInfo = req.body;
    try {
        let msg = await searchUserInfo(userInfo);
        res.send(msg)
    } catch (error) {
        res.send(error)
    }
});

router.post('/delete', async function (req, res) {
    let info = req.body;
    try {
        let msg = await deleteInfo(info);
        res.send(msg)
    } catch (error) {
        res.send(error)
    }
});

router.post('/update', async function (req, res) {
    try {
        let msg = await getAllAddressList();
        res.send(msg)
    } catch (error) {
        res.send(error)
    }
});


router.post('/authorization', async function (req, res) {
    let loginPassword = req.body;
    try {
        let authorizationPersonInfo = await authorization.authorizeUser(loginPassword);
        res.setHeader(`Set-Cookie`, `SESSION_ID=${authorizationPersonInfo["sessionId"]}; HttpOnly; Path=/`)
        res.send(JSON.stringify(authorizationPersonInfo["newAddressList"]));
    } catch (err) {
        res.send(err)
    }
});


router.post('/logOut', async function (req, res) {
    try {
        let token = req.cookies.SESSION_ID;
        req.session = null
        res.clearCookie('SESSION_ID', {path: '/'})
        res.status(200).json('User Logged out')
        await authorization.logOutFromSession(token);
        res.send()
    } catch (err) {
        res.send(err)
    }
});

router.get('/checkSession', async function (req, res) {
    try {
        let token = req.cookies.SESSION_ID;
        if (!token) {
            res.send()
        }
        let sessionInfo = await authorization.checkSession(token);
        res.send(sessionInfo)
    } catch (err) {
        res.send(err)
    }
});

module.exports = router;