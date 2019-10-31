const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cs157a'
})

connection.connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

const SELECT_ALL_QRY = 'SELECT * FROM '
const ITEM_DB = 'item(callNumber, purchasePrice, donated, type, status, genre, name, releaseDate, loanPeriod, lateFee'


// GET requests

// default
app.get('/', (req, res) => res.send('Hello World!'))

// react test
app.get('/react-test', (req, res) => res.send('Hi React, I\'m express.'))

// full test returns the full table contents
app.get('/full-test/:table', (req, res) => {
  connection.query(SELECT_ALL_QRY + req.params.table, (err, rows, fields) => {
    if(err) {console.log(err)}
    res.send(rows)
  })
})

// search all searches items with name parameter from url
app.get('/search-all/:name', (req, res) => {
  connection.query(SELECT_ALL_QRY+ ' item WHERE name='+req.params.name, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// remove item by call number from library
//TODO: test this
app.get('/remove-item/:callNum', (req, res) => {
  connection.query('DELETE FROM item WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// TODO: confirm PK of wishlist, currently not listed in MySQL
app.get('/wishlist', (req, res) => {
  connection.query(SELECT_ALL_QRY + ' wishlist WHERE libraryCardNumber=')
})


// POST requests

// add an item to the system
//TODO: need to finish + test
app.post('/add-item', (req, res) => {
  let newItem = req.body

  console.log('---add-item not implemented---\n')
  // connection.query('INSERT INTO' + ITEM_DB + ' VALUE()')
})

// add a new user
app.post('/submit-new-user', (req, res) => {
  // console.log(req.body);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    libraryCardNumber: Math.floor(Math.random() * 10000)  /// ONLY TEMPORARY
  }
  connection.query(SELECT_ALL_QRY + 'user WHERE email="' + `${newUser.email}"`, (err, row, fields) => {
    if (row[0]) {
      console.log("user already exists", row);
      res.status(400).send({error: 'user already exists'});
    } else {
      connection.query('INSERT INTO user SET ?', newUser);
      res.status(200).send({status: newUser.email + ' registered'});
    }
  });
})

// log in
// TODO hash passwords, create cookies/sessions
app.post('/login', (req, res) => {
  connection.query(SELECT_ALL_QRY + 'user WHERE email="' + `${req.body.email}"`, (err, row, fields) => {
    if (row[0]) {
      console.log(row[0]);
      if (row[0].password === req.body.password) {
        res.status(200).json("valid user");
      } else {
        res.status(400).json({error: 'Invalid User Credentials'});
      }
    } else {
      res.status(400).json({error: 'Invalid User Credentials'});
    }
  });
})

app.listen(port, () => console.log(`Library Management app listening on port ${port}!`));
