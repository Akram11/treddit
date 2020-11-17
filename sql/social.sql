DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    credits INTEGER DEFAULT 1,
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

DROP TABLE IF EXISTS offers
CASCADE;

CREATE TABLE offers
(
    id SERIAL PRIMARY KEY,
    creator_id INT REFERENCES users(id) NOT NULL,
    buyer_id INT REFERENCES users(id),
    title VARCHAR NOT NULL,
    text VARCHAR,
    price INTEGER NOT NULL,
    status VARCHAR DEFAULT 'available',
    Location VARCHAR,
    valid_from DATE ,
    valid_to DATE ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO offers
--     (creator_id, title, text, price, location)
-- VALUES
--     (208, 'Piano lesson', 'I can offer a piano lesson for beginners, I have a piano at my place, so you only need to attend', 1, 'mitte');

-- INSERT INTO offers
--     (creator_id, title, text, price, location)
-- VALUES
--     (208, 'Practice russian with me', 'if you want to practice your russian skills, I would be happy to offer my help', 1, 'prenzlauer berg');

-- INSERT INTO offers
--     (creator_id, title, text, price, location)
-- VALUES
--     (208, 'baby sitter', 'I can offer baby sitting for children above the age of 2', 1, 'prenzlauer berg');

-- INSERT INTO offers
--     (creator_id, title, text, price, location)
-- VALUES
--     (201, 'code review', 'if you are learning coding and need support, I can help you reviewing your repos', 1, 'Kreuzberg');


-- INSERT INTO offers
--     (creator_id, title, text, price, location)
-- VALUES
--     (205, 'cooking lesson', 'I can show how to cook a decent meal', 1, 'Wedding');

-- INSERT INTO messages
--     (sender_id, receiver_id,text)
-- VALUES
--     (201, 208 , 'hey man whats up');
-- INSERT INTO messages
--     (sender_id, receiver_id,text)
-- VALUES
--     (201, 208 , 'good you?');
-- INSERT INTO messages
--     (sender_id, receiver_id,text)
-- VALUES
--     (208, 201 , 'cool');
-- INSERT INTO messages
--     (sender_id, receiver_id,text)
-- VALUES
--     (208, 201 , 'what u up to?');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (200 , 'Hi there!');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (201 , 'hi guys, who is online?');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (208 , "who's up for a drink");

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (2 , 'who am I');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (10 , 'do you like my new profile picture');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (15 , 'Please send me an email');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (100 , 'who else likes dark chocolate?');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (150 , 'is it only me or this forum is boring?');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (79 , 'anyone would like to chat?');

-- INSERT INTO messages
--     (sender_id, text)
-- VALUES
--     (11 , 'hi lovely people');