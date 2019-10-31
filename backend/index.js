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
app.use(express.urlencoded());

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
  console.log(req.body);
  let newUser = req.body
  newUser.libraryCardNumber = 30;
  console.log(newUser)
  connection.query('INSERT INTO user SET ?', newUser);
  res.status(204).send()
})

app.listen(port, () => console.log(`Library Management app listening on port ${port}!`))
