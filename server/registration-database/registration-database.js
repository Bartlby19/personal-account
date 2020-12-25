const crypto = require('crypto');
const {execAsync} = require("../utils");
const statusResponse = {
    successful: {"200 OK": "Registration was successful"},
    loginUsed: {"409 Conflict": "This login or email already in use by another person."},
}
let hashPassword = (password) => {
    return crypto.createHash('md5').update(password).digest('hex');
}
let createTableSql = "CREATE TABLE IF NOT EXISTS users (name TEXT NOT NULL,email TEXT NOT NULL UNIQUE," +
    "login TEXT NOT NULL UNIQUE ,password TEXT NOT NULL,profileInfo TEXT NOT NULL)";
async function addUserRegistrationInformation(registrationData) {
    return new Promise(async (resolve, reject) => {
        await execAsync(createTableSql)

        let sql = `SELECT login, email FROM users WHERE login='${registrationData["login"]}' OR ` +
            `email='${registrationData["email"]}'`;
        try {
            let existedUser = await execAsync(sql);
            if (!existedUser || existedUser.length === 0) {
                let params = [registrationData["name"], registrationData["email"],
                    registrationData["login"], hashPassword(registrationData["password"]), registrationData["profileInfo"]];
                await execAsync("INSERT INTO users VALUES (?,?,?,?,?)", params);
                resolve(statusResponse.successful)
            } else {
                reject(statusResponse.loginUsed)
            }

        } catch (error) {
            reject("technical issue");
        }
    })
}

module.exports = {
    addUserRegistrationInformation: addUserRegistrationInformation
}
