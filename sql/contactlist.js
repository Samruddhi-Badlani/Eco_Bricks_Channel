const pool = require("../db");

/* RUN THIS SCRIPT FOR GENERATING CONTACTLIST TABLE */

const obj = [
  {
    _id: "61766fc4e61ce11cb86d9306",
    name: "Maxine Church",
    gender: "female",
    company: "REMOTION",
    email: "maxinechurch@remotion.com",
    phone: "+1 (810) 508-3574",
    address: "945 Wogan Terrace, Steinhatchee, Tennessee, 2535",
    about:
      "Labore quis eu duis deserunt non fugiat aute dolor velit. Tempor commodo esse veniam ullamco velit laborum. Exercitation aliquip pariatur reprehenderit nostrud. Quis ipsum dolore voluptate mollit do nostrud ea deserunt nisi. Enim laborum minim aute et occaecat proident. Exercitation et nulla aute occaecat consequat elit occaecat mollit proident dolor eiusmod voluptate in. Officia dolor dolore consequat aliquip non.\r\n",
    registered: "2017-04-13T08:28:59 -06:-30",
  },
  {
    _id: "61766fc4ba4857736703ce54",
    name: "Selena Drake",
    gender: "female",
    company: "DAIDO",
    email: "selenadrake@daido.com",
    phone: "+1 (961) 453-3886",
    address: "214 Kingston Avenue, Sunriver, Massachusetts, 9925",
    about:
      "Labore esse sit sint anim irure sunt consequat. Proident commodo elit quis exercitation fugiat laboris ullamco irure duis dolore deserunt aliqua incididunt. Duis dolore culpa elit laboris nisi dolor pariatur incididunt nostrud amet aute culpa tempor. Velit sint dolor labore ipsum duis dolore ad et dolore proident. Quis ipsum adipisicing excepteur ad eu aliquip. Exercitation exercitation amet sunt cillum nostrud consequat Lorem ut enim. Esse ex sunt qui proident non commodo laborum voluptate.\r\n",
    registered: "2017-10-25T07:01:33 -06:-30",
  },
  {
    _id: "61766fc4844af58132377b52",
    name: "Lewis Sanchez",
    gender: "male",
    company: "ACRUEX",
    email: "lewissanchez@acruex.com",
    phone: "+1 (934) 475-2635",
    address: "321 Thatford Avenue, Neibert, Ohio, 9808",
    about:
      "Ea enim Lorem tempor do. Laboris occaecat quis sit magna deserunt duis reprehenderit laborum exercitation consectetur aute. Veniam ex dolor dolor consectetur consequat Lorem velit minim anim eiusmod ut nostrud incididunt ipsum.\r\n",
    registered: "2019-11-20T04:22:29 -06:-30",
  },
  {
    _id: "61766fc415c71039c58d6b47",
    name: "Annmarie Gutierrez",
    gender: "female",
    company: "CENTICE",
    email: "annmariegutierrez@centice.com",
    phone: "+1 (828) 453-2314",
    address: "568 Clove Road, Sisquoc, Minnesota, 3992",
    about:
      "Et nostrud eiusmod exercitation ex veniam reprehenderit ex veniam adipisicing sint mollit velit culpa officia. Reprehenderit qui aliqua ad elit laboris eiusmod incididunt eu proident officia fugiat aliqua. Cupidatat eiusmod elit anim elit sint voluptate nostrud labore ipsum ipsum ex amet. Enim occaecat pariatur ut duis ut adipisicing non sint aute et nulla eu. Esse et incididunt consequat deserunt officia enim esse ullamco Lorem ad. Incididunt ea Lorem magna qui. Mollit tempor pariatur qui minim ex deserunt tempor id in.\r\n",
    registered: "2018-12-07T10:25:20 -06:-30",
  },
  {
    _id: "61766fc4483c5bebf72c3f2d",
    name: "Earnestine Lowery",
    gender: "female",
    company: "SCHOOLIO",
    email: "earnestinelowery@schoolio.com",
    phone: "+1 (834) 546-2310",
    address: "200 Kansas Place, Murillo, Colorado, 2717",
    about:
      "Veniam duis labore cupidatat in et eu sit enim. Aute exercitation velit do et sint occaecat nostrud labore. Proident ipsum duis labore eiusmod dolore ex ea est esse elit. Officia et proident nisi ut adipisicing eu ad labore irure officia est voluptate Lorem est. Est eu tempor veniam do exercitation. Velit est tempor culpa dolor tempor magna. Eu consectetur laboris dolor aliquip ut pariatur laboris incididunt eiusmod do in id sunt.\r\n",
    registered: "2015-11-23T10:19:34 -06:-30",
  },
  {
    _id: "61766fc40d31dac97ed1f647",
    name: "Schultz Cummings",
    gender: "male",
    company: "ACUSAGE",
    email: "schultzcummings@acusage.com",
    phone: "+1 (905) 580-2682",
    address:
      "430 Concord Street, Chumuckla, Federated States Of Micronesia, 8470",
    about:
      "Sit consectetur nulla dolore deserunt amet amet voluptate nisi velit. Est ad velit dolore voluptate sint fugiat non. Eiusmod dolore mollit enim sit quis ut aute consequat duis laborum Lorem velit fugiat. Non non velit ipsum excepteur eiusmod ipsum exercitation sunt fugiat anim adipisicing anim. Et ex excepteur nulla aliquip pariatur magna enim anim do.\r\n",
    registered: "2020-12-21T08:13:14 -06:-30",
  },
  {
    _id: "61766fc443622510a05324d7",
    name: "Roseann Salazar",
    gender: "female",
    company: "ISONUS",
    email: "roseannsalazar@isonus.com",
    phone: "+1 (943) 553-2224",
    address: "281 Matthews Court, Topanga, Oklahoma, 8845",
    about:
      "Non quis elit ad amet ea aliqua eu amet aliqua veniam voluptate culpa. Est enim eiusmod in in ullamco ea consectetur id minim. Enim non ipsum do cillum et voluptate tempor pariatur reprehenderit veniam tempor. Consectetur excepteur sit excepteur dolore quis ad nisi.\r\n",
    registered: "2017-04-13T10:37:32 -06:-30",
  },
];

/*Firstly run this */

pool.query(
  `CREATE TABLE contactlist(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
 company VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
    gender VARCHAR(255)  NULL,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(1000)  NULL,
    about VARCHAR(10000) NULL,
    registered VARCHAR(255) NOT NULL
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
    `INSERT INTO contactlist(name, gender, company, email, phone, address, about, registered)
    VALUES ( $1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      obj[i].name,
      obj[i].gender,
      obj[i].company,
      obj[i].email,
      obj[i].phone,
      obj[i].address,
      obj[i].about,
      obj[i].registered,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
  );
}
