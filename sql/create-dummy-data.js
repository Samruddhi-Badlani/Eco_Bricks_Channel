const pool = require("../db");
const axios = require('axios');
/*RUN THIS FOR REGISTERING ALL COMPANY AND PERSONS AS USERS IN USERS TABLE*/

const obj = [
    {
        name: "Maxine Church",
        email: "maxinechurch@remotion.com",
        password: "maxinechurch",
        password2: "maxinechurch"
    },
    {
        name: "Selena Drake",
        email: "selenadrake@daido.com",
        password: "selenadrake",
        password2: "selenadrake"

    },
    {
        name: "Lewis Sanchez",
        email: "lewissanchez@acruex.com",
        password: "lewissanchez",
        password2: "lewissanchez"
    },
    {
        name: "Annmarie Gutierrez",
        email: "annmariegutierrez@centice.com",
        password: "annmariegutierrez",
        password2: "annmariegutierrez"
    },
    {
        name: "Earnestine Lowery",
        email: "earnestinelowery@schoolio.com",
        password: "earnestinelowery",
        password2: "earnestinelowery"
    },
    {
        name: "Schultz Cummings",
        email: "schultzcummings@acusage.com",
        password: "schultzcummings",
        password2: "schultzcummings"
    },
    {
        name: "Roseann Salazar",
        email: "roseannsalazar@isonus.com",
        password: "roseannsalazar",
        password2: "roseannsalazar"
    },
    {
        "name": "Melton Cross",
        "email": "meltoncross@isosphere.com",
        "password": "meltoncross",
        "password2": "meltoncross"
    },
    {
        "name": "Allison Zimmerman",
        "email": "allisonzimmerman@isosphere.com",
        password: "allisonzimmerman",
        password2: "allisonzimmerman"
    },
    {
        "name": "Janet Richards",
        "email": "janetrichards@isosphere.com",
        password: "janetrichards",
        password2: "janetrichards"

    },
    {
        "name": "Michael Nash",
        "email": "michaelnash@isosphere.com",
        password: "michaelnash",
        password2: "michaelnash"

    },
    {
        "name": "Madeleine Benjamin",
        "email": "madeleinebenjamin@isosphere.com",
        password: "madeleinebenjamin",
        password2: "madeleinebenjamin"
    },
    {
        "name": "Garrett Hatfield",
        "email": "garretthatfield@isosphere.com",
        password: "garretthat",
        password2: "garretthat"
    }
];

for (let i = 0; i < obj.length; i++) {
    axios.post('http://localhost:3000/users/register', obj[i])
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

