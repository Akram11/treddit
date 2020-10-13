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

module.exports.getUserEmail = (mail) => {
    return db.query(
        `SELECT id, email, password AS hash FROM users WHERE email = $1`,
        [mail]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO codes(email, code)
                     VALUES ($1, $2)`,
        [email, code]
    );
};

module.exports.getCode = (email) => {
    return db.query(
        `SELECT * FROM codes WHERE
         email=($1) 
         AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' 
         ORDER BY id DESC LIMIT 1`,
        [email]
    );
};

module.exports.getUser = (id) => {
    return db.query(
        `SELECT id, first, last, credits ,email, img_url, bio FROM users WHERE id = $1`,
        [id]
    );
};

module.exports.updateImg = (id, url) => {
    return db.query(
        `
        UPDATE users 
        SET img_url = ($2)
        WHERE id = ($1)
        RETURNING img_url;`,
        [id, url]
    );
};

module.exports.updateBio = (id, bio) => {
    return db.query(
        `
        UPDATE users 
        SET bio = ($2)
        WHERE id = ($1)
        RETURNING  bio;`,
        [id, bio]
    );
};

module.exports.getRecentUsers = () => {
    return db.query(`SELECT id, first, last, email ,img_url, email,bio FROM users 
     ORDER BY id DESC LIMIT 3;
     `);
};

module.exports.getAllUsers = () => {
    return db.query(`SELECT id, first, last, email, credits ,img_url, bio FROM users 
     ORDER BY id;
     `);
};

module.exports.searchUsers = (q) => {
    return db.query(
        `
        SELECT id, first, last, email, img_url, bio FROM users
        WHERE first ILIKE $1
        LIMIT 10
        `,
        [q + "%"]
    );
};

module.exports.getFriendRelation = (id1, id2) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1);`,
        [id1, id2]
    );
};

module.exports.addFriendRequest = (sender_id, recipient_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) returning *`,
        [sender_id, recipient_id]
    );
};

module.exports.cancelFriendRequest = (sender_id, recipient_id) => {
    return db.query(
        `Delete from friendships WHERE sender_id = $1 AND recipient_id=$2`,
        [sender_id, recipient_id]
    );
};

module.exports.acceptFriendRequest = (sender_id, recipient_id) => {
    return db.query(
        `UPDATE friendships
         SET accepted = $3
         WHERE sender_id = $1 AND recipient_id = $2`,
        [sender_id, recipient_id, true]
    );
};

module.exports.updateFriendship = (sender_id, recipient_id, status) => {
    return db.query(
        `UPDATE friendships
         SET accepted = $3
         WHERE sender_id = $1 AND recipient_id = $2`,
        [sender_id, recipient_id, status]
    );
};

module.exports.getFriends = (userId) => {
    return db.query(
        `
          SELECT users.id, first, last, img_url, email ,accepted
          FROM friendships
          JOIN users
          ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
          OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
          OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        `,
        [userId]
    );
};

module.exports.getLastMsgs = () => {
    return db.query(`
        SELECT first, last, img_url, messages.id ,sender_id, text, messages.created_at 
        FROM users JOIN messages on users.id = messages.sender_id
        WHERE messages.receiver_id IS NULL ORDER BY messages.id DESC LIMIT 10;
    `);
};

module.exports.addMessage = (sender_id, text) => {
    return db.query(
        `INSERT INTO messages (sender_id, text) VALUES ($1, $2)  RETURNING *`,
        [sender_id, text]
    );
};

module.exports.getSender = (id) => {
    return db.query(
        `SELECT first, last, email ,img_url FROM users WHERE id = $1`,
        [id]
    );
};

module.exports.getUserChat = (id, otherID) => {
    return db.query(
        `SELECT * from messages WHERE
        (sender_id = $2 AND receiver_ID = $1) OR 
        (sender_id = $1 AND receiver_ID = $2) ORDER BY messages.id DESC`,
        [id, otherID]
    );
};

module.exports.getOffers = () => {
    return db.query(`SELECT users.id, first, last, img_url, email ,offers.id , creator_id, status, title, text, price, status, location ,offers.created_at
        FROM users JOIN offers on users.id = offers.creator_id ORDER BY offers.id DESC`);
};
module.exports.getOffer = (id) => {
    return db.query(
        `SELECT users.id, first, last, img_url, email,offers.id , creator_id, title, text, price, status, location ,offers.created_at
        FROM users JOIN offers on users.id = offers.creator_id AND users.id = $1`,
        [id]
    );
};

module.exports.addOffer = (id, title, text, price, location) => {
    return db.query(
        ` INSERT INTO offers
         (creator_id, title, text, price, location)
          VALUES
         ($1, $2, $3, $4, $5) RETURNING *`,
        [id, title, text, price, location]
    );
};

// just a comment
// users.id, users.first, users.last, users.img_url, users.email , messages.text, messages.created_at

// Select first, last, img_url, sender_id, text, created_at FROM users JOIN messages on users.id = messages.sender_id;

// `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) returning id`,
// SELECT * FROM codes WHERE
//          email='akram.f11+test@gmail.com'
//          AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
//          ORDER BY id DESC LIMIT 1
// SELECT * FROM my_table
// WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';

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

module.exports.updateUserPwd = (email, password) => {
    return db.query(
        `UPDATE users
         SET password = $2
         WHERE email = $1`,
        [email, password]
    );
};

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
