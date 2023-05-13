const mysql = require('mysql2/promise');
const config = require('../config');

async function execute(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

async function checkUser(username) {
    const rows = await execute(
        `SELECT id, username, password FROM users WHERE username='${username}' LIMIT 1`
    );
    if (!rows)
        return [];

    return rows;
}

async function addUser(name, pass) {
    const rows = await execute(
        `SELECT id, username, password FROM users WHERE username='${name}' LIMIT 1`
    );
    var user = !rows ? undefined : rows[0];
    if (user)
        return false;
    
    var out = await execute(
        `INSERT INTO users (username, password) VALUES ('${name}', '${pass}')`
    )
    return out;
}

module.exports = {
    execute,
    checkUser,
    addUser
}