const {getAllAddressList} = require("../utils");
const {execAsync} = require("../utils");
const error = "Technical problem"

async function addUserInfo(addInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [addInfo["userName"], addInfo["phone"], addInfo["city"]]
            await execAsync("INSERT INTO addressList (name,phone,city) VALUES (?,?,?)", params);
            let addressList = getAllAddressList()
            resolve(addressList);
        } catch (err) {
            reject(error);
        }
    });
}

async function deleteInfo(deleteInfo) {
    console.log(deleteInfo)
    return new Promise(async (resolve, reject) => {
        try {
            let sqlAddressList = `DELETE FROM addressList WHERE ID=${deleteInfo.deleteInfo}`;
            await execAsync(sqlAddressList);
            let addressList = await getAllAddressList()
            if (addressList.length===0){

            }
            resolve(addressList);
        } catch (err) {
            reject(error);
        }
    });
}


async function searchUserInfo(searchInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlAddressList = `SELECT * FROM addressList WHERE name="${searchInfo.searchInfo}" OR phone="${searchInfo.searchInfo}" OR city="${searchInfo.searchInfo}"`;
            let addressList=await execAsync(sqlAddressList);
            resolve(addressList);
            resolve();
        } catch (err) {
            reject(error);
        }
    });
}

module.exports = {
    addUserInfo: addUserInfo,
    deleteInfo: deleteInfo,
    searchUserInfo: searchUserInfo
}