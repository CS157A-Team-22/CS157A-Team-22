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

const QRY = 'SELECT * FROM '//user;'



app.get('/', (req, res) => res.send('Hello World!'))
app.get('/react-test', (req, res) => res.send('Hi React, I\'m express.'))
app.get('/mysql-test', (req, res) => {
    connection.query(QRY, (err, rows, fields) => {
      console.log(err)
      console.log(rows)
      console.log(fields)
      if(err) throw err
      res.send(rows)
    })
  })

app.get('/full-test/:table', (req, res) => {
  connection.query(QRY + req.params.table, (err, rows, fields) => {
    if(err) {console.log(err)}
    res.send(rows)
  })
})



app.post('/submit-new-user', (req, res) => {
  console.log(req.body);
  let newUser = req.body
  newUser.libraryCardNumber = 30;
  console.log(newUser)
  connection.query('INSERT INTO user SET ?', newUser);
  res.status(204).send()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))