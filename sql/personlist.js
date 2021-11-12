const pool = require("../db");

/* RUN THIS SCRIPT FOR GENERATING PERSON TABLE */

const obj = [
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 26,
    "name": "Melton Cross",
    "email": "meltoncross@isosphere.com",
    "phone": "+1 (891) 409-3416",
    "address": "951 Ovington Avenue, Fairacres, Virgin Islands, 828"
  },
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 24,
    "name": "Allison Zimmerman",
    "email": "allisonzimmerman@isosphere.com",
    "phone": "+1 (936) 596-3237",
    "address": "588 Dover Street, Sparkill, Northern Mariana Islands, 433"
  },
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 20,
    "name": "Janet Richards",
    "email": "janetrichards@isosphere.com",
    "phone": "+1 (890) 506-3153",
    "address": "213 Henry Street, Sandston, Federated States Of Micronesia, 6408"
  },
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 31,
    "name": "Michael Nash",
    "email": "michaelnash@isosphere.com",
    "phone": "+1 (996) 598-2244",
    "address": "794 Baltic Street, Bascom, Pennsylvania, 2468"
  },
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 33,
    "name": "Madeleine Benjamin",
    "email": "madeleinebenjamin@isosphere.com",
    "phone": "+1 (995) 479-3650",
    "address": "403 School Lane, Winfred, Marshall Islands, 8507"
  },
  {
    "isActive": "true",
    "picture": "https://www.gravatar.com/avatar?d=mp",
    "age": 23,
    "name": "Garrett Hatfield",
    "email": "garretthatfield@isosphere.com",
    "phone": "+1 (834) 497-3234",
    "address": "361 Macon Street, Emory, Arkansas, 3363"
  }
];

/*Firstly run this */

pool.query(
  `CREATE TABLE person(
      id SERIAL PRIMARY KEY,
      isActive VARCHAR(10) NULL,
      picture VARCHAR(500) NULL,
      age numeric NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address VARCHAR(1000)  NULL
  )`,
  (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
  }
);

/*Secondly run this */

for (let i = 0; i < obj.length; i++) {
  pool.query(
    `INSERT INTO person(isActive, picture, age, name,email, phone, address)
      VALUES ( $1,$2,$3,$4,$5,$6,$7)`,
    [
      obj[i].isActive,
      obj[i].picture,
      obj[i].age,
      obj[i].name,
      obj[i].email,
      obj[i].phone,
      obj[i].address,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
  );
}
