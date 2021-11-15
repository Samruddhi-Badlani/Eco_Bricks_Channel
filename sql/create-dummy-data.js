const pool = require("../db");
const axios = require('axios');
/*RUN THIS FOR REGISTERING ALL DUMMY COMPANY AND INDIVIDUALS AS USERS IN USERS TABLE*/
/* name, email, password, password2, role, companyname, registered, phone, city, state, country, address, cost, capacity */
/* City names New York.
Los Angeles.
Chicago.
Houston.
Phoenix.
Philadelphia.
San Antonio.
San Diego.
*/
const obj = [
    {
        name: "Maxine Church",
        companyname: "REMOTION",
        role: "company",
        email: "maxinechurch@remotion.com",
        phone: "+1 (810) 508-3574",
        address: "945 Wogan Terrace, Steinhatchee, Tennessee, 2535",
        registered: "2017-04-13T08:28:59 -06:-30",
        password: "maxinechu",
        password2: "maxinechu",
        city:"Los Angeles",
        state: "California",
        country:"United States",
        cost: 10,
        capacity: 1 

    },
    {
        name: "Selena Drake",
        companyname: "DAIDO",
        role: "company",
        email: "selenadrake@daido.com",
        phone: "+1 (961) 453-3886",
        address: "214 Kingston Avenue, Sunriver, Massachusetts, 9925",
        registered: "2017-10-25T07:01:33 -06:-30",
        password: "selenadrake",
        password2: "selenadrake",
        city:"Chicago",
        state: "California",
        country:"United States",
        cost: 25,
        capacity: 2 

    },
    {
        name: "Lewis Sanchez",
        companyname: "ACRUEX",
        role: "company",
        email: "lewissanchez@acruex.com",
        phone: "+1 (934) 475-2635",
        address: "321 Thatford Avenue, Neibert, Ohio, 9808",
        registered: "2019-11-20T04:22:29 -06:-30",
        password: "lewissanchez",
        password2: "lewissanchez",
        city:"San Francisco",
        state: "California",
        country:"United States",
        cost: 15,
        capacity: 1 

    },
    {
        name: "Annmarie Gutierrez",
        companyname: "CENTICE",
        role: "company",
        email: "annmariegutierrez@centice.com",
        phone: "+1 (828) 453-2314",
        address: "568 Clove Road, Sisquoc, Minnesota, 3992",
        registered: "2018-12-07T10:25:20 -06:-30",
        password: "annmariegutierrez",
        password2: "annmariegutierrez",
        city:"Los Angeles",
        state: "California",
        country:"United States",
        cost: 10,
        capacity: 1 
    },
    {
        name: "Earnestine Lowery",
        companyname: "SCHOOLIO",
        role: "company",
        email: "earnestinelowery@schoolio.com",
        phone: "+1 (834) 546-2310",
        address: "200 Kansas Place, Murillo, Colorado, 2717",
        registered: "2015-11-23T10:19:34 -06:-30",
        password: "earnestinelowery",
        password2: "earnestinelowery",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 
    },
    {
        name: "Schultz Cummings",
        companyname: "ACUSAGE",
        role: "company",
        email: "schultzcummings@acusage.com",
        phone: "+1 (905) 580-2682",
        address:
            "430 Concord Street, Chumuckla, Federated States Of Micronesia, 8470",
        registered: "2020-12-21T08:13:14 -06:-30",
        password: "schultzcummings",
        password2: "schultzcummings",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 12,
        capacity: 1 
    },
    {
        name: "Roseann Salazar",
        companyname: "ISONUS",
        role: "company",
        email: "roseannsalazar@isonus.com",
        phone: "+1 (943) 553-2224",
        address: "281 Matthews Court, Topanga, Oklahoma, 8845",
        registered: "2017-04-13T10:37:32 -06:-30",
        password: "roseannsalazar",
        password2: "roseannsalazar",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 30,
        capacity: 2 
    },
    {
        "name": "Melton Cross",
        "email": "meltoncross@isosphere.com",
        role: "individual",
        companyname: "NA",
        "phone": "+1 (891) 409-3416",
        "address": "951 Ovington Avenue, Fairacres, Virgin Islands, 828",
        "password": "meltoncross",
        "password2": "meltoncross",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 
    },
    {
        "name": "Allison Zimmerman",
        "email": "allisonzimmerman@isosphere.com",
        role: "individual",
        companyname: "NA",
        "phone": "+1 (936) 596-3237",
        "address": "588 Dover Street, Sparkill, Northern Mariana Islands, 433",
        password: "allisonzimmerman",
        password2: "allisonzimmerman",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 
    },
    {
        "name": "Janet Richards",
        "email": "janetrichards@isosphere.com",
        role: "individual",
        companyname: "NA",
        "phone": "+1 (890) 506-3153",
        "address": "213 Henry Street, Sandston, Federated States Of Micronesia, 6408",
        password: "janetrichards",
        password2: "janetrichards",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 

    },
    {
        "name": "Michael Nash",
        "email": "michaelnash@isosphere.com",
        companyname: "NA",
        role: "individual",
        "phone": "+1 (996) 598-2244",
        "address": "794 Baltic Street, Bascom, Pennsylvania, 2468",
        password: "michaelnash",
        password2: "michaelnash",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 

    },
    {
        "name": "Madeleine Benjamin",
        "email": "madeleinebenjamin@isosphere.com",
        role: "individual",
        companyname: "NA",
        "phone": "+1 (995) 479-3650",
        "address": "403 School Lane, Winfred, Marshall Islands, 8507",
        password: "madeleinebenjamin",
        password2: "madeleinebenjamin",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 
    },
    {
        "name": "Garrett Hatfield",
        "email": "garretthatfield@isosphere.com",
        role: "individual",
        companyname: "NA",
        "phone": "+1 (834) 497-3234",
        "address": "361 Macon Street, Emory, Arkansas, 3363",
        password: "garretthat",
        password2: "garretthat",
        city:"Chicago",
        state: "California",
        country:"United States",
  
        cost: 10,
        capacity: 1 
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

