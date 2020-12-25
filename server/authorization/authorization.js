const crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');
const fetch = require("node-fetch");
const {getAllAddressList} = require("../utils");
const {execAsync} = require("../utils");const tokenObj = new TokenGenerator(256, TokenGenerator.BASE62);
const statusResponse = {
    personNotExisted: {"401 Unauthorized": "Wrong password or login."},
    internalError: {"500 Unauthorized": " Internal Server Error."},
}

async function authorizeUser(loginPassword) {
    return new Promise(async (resolve, reject) => {
            try {
                let login = loginPassword["login"];
                let sessionExistSql = `SELECT login FROM usersSession WHERE login='${login}'`;
                let existSession = await execAsync(sessionExistSql);
                if (existSession || existSession.length !== 0) {
                    let sqlDeleteSession = `DELETE FROM  usersSession   WHERE login='${login}'`;
                    await execAsync(sqlDeleteSession);
                }
                let hashPassword = crypto.createHash('md5').update(loginPassword["password"]).digest('hex');
                let sqlExistedUser = `SELECT * FROM users WHERE login='${loginPassword["login"]}' AND ` +
                    `password='${hashPassword}'`;
                let existedUser = await execAsync(sqlExistedUser);
                if (!existedUser || existedUser.length === 0) {
                    reject(statusResponse.personNotExisted)
                } else {
                    let i = 0;
                    let token;
                    while (true) {
                        i++;
                        token = tokenObj.generate();
                        let sqlExistedSessionWithToken = `SELECT sessionId FROM usersSession WHERE sessionId='${token}'`;
                        let sessionId = await execAsync(sqlExistedSessionWithToken);
                        if (!sessionId || sessionId.length === 0) {
                            break;
                        }
                    }
                    let userInfo = existedUser[0];
                    let params = [token, userInfo["name"], userInfo["email"],
                        userInfo["login"], userInfo["password"], userInfo["profileInfo"]]
                    await execAsync("INSERT INTO usersSession (sessionId,name,email,login,password,profileInfo) " +
                        " VALUES (?,?,?,?,?,?)", params);
                    let addressList = await getAllAddressList();
                    if (addressList.length === 0) {
                        addressList = await getAddressList()
                    }
                    resolve({
                        sessionId: token,
                        newAddressList: addressList
                    })
                }
            } catch (error) {
                reject(statusResponse.internalError);
            }
        }
    )
}

async function getAddressList() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const json = await response.json();
    json.map(async function (el) {
        let params = [el["username"], el["phone"], el["address"]["city"]]
        await execAsync("INSERT INTO addressList (name,phone,city) VALUES (?,?,?)", params);
    })
    return json.map(function (el,index) {
        return {
            "id":index+1,
            "name": el["username"],
            "phone": el["phone"],
            "city": el["address"]["city"]
        }
    })
}

async function logOutFromSession(token) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlDeleteSession = `DELETE FROM  usersSession   WHERE sessionId='${token}'`;
            await execAsync(sqlDeleteSession);
        } catch (err) {
            reject(statusResponse.internalError);
        }
    })
}

async function checkSession() {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlAddressList = `SELECT * FROM addressList`;
            let AddressList = await execAsync(sqlAddressList);
            resolve(AddressList);
        } catch (err) {
            reject(statusResponse.internalError);
        }
    });
}

module.exports = {
    authorizeUser: authorizeUser,
    checkSession: checkSession,
    logOutFromSession: logOutFromSession
}