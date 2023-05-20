var crypto = require("crypto");

function generateSalt(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString("hex")
        .slice(0,16)
}
function sha512(password, salt) {
    var hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    var hash = hash.digest("hex");
    return {
        salt,
        hash
    }
}
function generatePassword(password) {
    var salt = generateSalt(16);
    var passwordSalt = sha512(password, salt);

    return passwordSalt;
}
function validatePassword(password, saltOnDB, hashOnDB) {
    var saltPassword = sha512(password, saltOnDB);
    return hashOnDB === saltPassword.hash;
}

module.exports = {
    generatePassword,
    validatePassword
}