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

async function addRecord(name, points, time, map, difficulty) {
    const rows = await execute(
        `SELECT id, name, points, time, map, difficulty FROM leaderboard WHERE name='${name}' AND map='${map}' AND difficulty='${difficulty}' LIMIT 1`
    );

    if (!rows[0]) {
        var out = await execute(
            `INSERT INTO leaderboard (name, points, time, map, difficulty) VALUE ('${name}', '${points}', '${time}', '${map}', '${difficulty}')`
        )
    } else {
        var id = rows[0].id;
        var l_points = rows[0].points;

        if (l_points > points)
            return;

        var out = await execute(
            `UPDATE leaderboard SET points=${points}, time=${time} WHERE id=${id}`
        )
    }

    return out;
}

async function getLeaderboard(name, map, difficulty) {
    const rows = await execute(
        `SELECT id, name, points, time, map, difficulty FROM leaderboard WHERE name LIKE '${name}' AND map LIKE '${map}' AND difficulty LIKE '${difficulty}' ORDER BY points DESC`
    );

    return rows;
}

module.exports = {
    execute,
    checkUser,
    addUser,
    addRecord,
    getLeaderboard
}