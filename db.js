const spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

module.exports.addUser = (fname, lname, email, hpwd) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) returning id`,
        [fname, lname, email, hpwd]
    );
};

// module.exports.getUserEmail = (mail) => {
//     return db.query(
//         `SELECT id, email, password AS hash FROM users WHERE email = $1`,
//         [mail]
//     );
// };

// module.exports.getUser = (id) => {
//     return db.query(`SELECT first, last FROM users WHERE id = $1`, [id]);
// };

// module.exports.isSigned = (user_id) => {
//     return db.query(`SELECT id FROM signatures where user_id = $1`, [user_id]);
// };

// module.exports.updateUser = (first, last, email, id) => {
//     return db.query(
//         `UPDATE users
//          SET first = $1, last = $2, email = $3
//          WHERE id = $4`,
//         [first, last, email, id]
//     );
// };

// module.exports.updateUser = (first, last, email, id) => {
//     return db.query(
//         `UPDATE users
//          SET first = $1, last = $2, email = $3
//          WHERE id = $4`,
//         [first, last, email, id]
//     );
// };

// module.exports.updateUserPwd = (first, last, email, pwd, id) => {
//     return db.query(
//         `UPDATE users
//          SET first = $1, last = $2, email = $3, password = $4
//          WHERE id = $5`,
//         [first, last, email, pwd, id]
//     );
// };

// module.exports.updateProfile = (age, city, url, user_id) => {
//     return db.query(
//         `INSERT INTO user_profiles (age, city, url, user_id)
//         values ($1, $2, $3, $4)
//         on conflict (user_id)
//         DO UPDATE set age = $1, city = $2, url = $3
//     `,
//         [age || null, city || null, url || null, user_id]
//     );
// };

// module.exports.deleteUser = (user_id) => {
//     return db.query(` DELETE FROM users where id = $1`, [user_id]);
// };
