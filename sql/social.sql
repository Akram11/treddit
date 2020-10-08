DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR NOT NULL CHECK (password != ''),
    img_url VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS codes
CASCADE;
CREATE TABLE codes
(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS friendships
CASCADE;

CREATE TABLE friendships
(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS messages
CASCADE;

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    receiver_id INT REFERENCES users(id),
    text VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO messages
    (sender_id, receiver_id,text)
VALUES
    (201, 208 , 'hey man whats up');
INSERT INTO messages
    (sender_id, receiver_id,text)
VALUES
    (201, 208 , 'good you?');
INSERT INTO messages
    (sender_id, receiver_id,text)
VALUES
    (208, 201 , 'cool');
INSERT INTO messages
    (sender_id, receiver_id,text)
VALUES
    (208, 201 , 'what u up to?');

INSERT INTO messages
    (sender_id, text)
VALUES
    (200 , 'Hi there!');

INSERT INTO messages
    (sender_id, text)
VALUES
    (201 , 'hi guys, who is online?');

INSERT INTO messages
    (sender_id, text)
VALUES
    (208 , "who's up for a drink");

INSERT INTO messages
    (sender_id, text)
VALUES
    (2 , 'who am I');

INSERT INTO messages
    (sender_id, text)
VALUES
    (10 , 'do you like my new profile picture');

INSERT INTO messages
    (sender_id, text)
VALUES
    (15 , 'Please send me an email');

INSERT INTO messages
    (sender_id, text)
VALUES
    (100 , 'who else likes dark chocolate?');

INSERT INTO messages
    (sender_id, text)
VALUES
    (150 , 'is it only me or this forum is boring?');

INSERT INTO messages
    (sender_id, text)
VALUES
    (79 , 'anyone would like to chat?');

INSERT INTO messages
    (sender_id, text)
VALUES
    (11 , 'hi lovely people');