const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
// const dataBase = require("../registration-database/registration-database");
// const authorization = require("../authorization/authorization")
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// router.post('/addAddress', async function (req, res) {
//     let address = req.body;
//     try {
//         let msg = await addAddress(address)
//         res.send(msg)
//     } catch (error) {
//         res.send(error)
//     }
// });
//
// router.post('/deleteAddress', async function (req, res) {
//     let address = req.body;
//     try {
//         let msg = await deleteAddress(address)
//         res.send(msg)
//     } catch (error) {
//         res.send(error)
//     }
// });
//
// router.post('/addAddress', async function (req, res) {
//     let address = req.body;
//     try {
//         let msg = await findInfo(address)
//         res.send(msg)
//     } catch (error) {
//         res.send(error)
//     }
// });
//

module.exports = router;