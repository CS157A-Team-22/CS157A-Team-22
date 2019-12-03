const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cs157a',
  dateStrings: true
})

connection.connect();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded( {extended: true} ));
app.use(bodyParser.urlencoded( {extended: true} ));

const SELECT_ALL_QRY = 'SELECT * FROM '


// GET requests

// default
app.get('/', (req, res) => res.send('Hello World!'))

// get all items in inventory
app.get('/api/items', (req, res) => {
  connection.query(SELECT_ALL_QRY + 'item', (err, row, fields) => {
    // if there are items in the row array 
    if (Object.keys(row).length != 0) {
      return res.status(200).json(row);
    }
    return res.status(502).json({error: 'No items in inventory'});
  });
});

// get details of item in inventory
app.get('/api/item', (req, res) => {
  // let authUser = JSON.parse(req.query['authUser']);
  console.log(req.query['call-number']);
  console.log("hitting route");
  let book_query = `SELECT * from book, item  WHERE item.callNumber="${req.query['call-number']}" and item.callNumber=book.callNumber`;
  connection.query(book_query, (err, row, fields) => {
    console.log(row);
    // if there are items in the row array 
    if (row !== undefined && Object.keys(row).length != 0) {
      return res.status(200).json(row);
    } else {
      let movie_query = `SELECT * from movie, item  WHERE item.callNumber="${req.query['call-number']}" and item.callNumber=movie.callNumber`;
      connection.query(movie_query, (err, row, fields) => {
        console.log(row);
        // if there are items in the row array 
        if (row !== undefined && Object.keys(row).length != 0) {
          return res.status(200).json(row);
        } else {
          return res.status(502).json({error: 'Cannot find item'});
        }
      });
    }  
  });
});

// check if a user is librarian or customer
app.get('/api/user-type', (req, res) => {
  let librarian_query = `SELECT * from librarian, user 
                        WHERE user.libraryCardNumber="${req.query['card-number']}" 
                        AND user.libraryCardNumber=librarian.libraryCardNumber`;
  connection.query(librarian_query, (err, row, fields) => {
    console.log(row);
    // if there are items in the row array 
    if (row !== undefined && Object.keys(row).length != 0) {
      return res.status(200).json(
        {
          'type': 'librarian', 
          'options': ['Check In', 'Check out', 'Add New Item', 'Generate Report']
        }
      );
    } else {
      let customer_query = `SELECT * from customer, user  
                            WHERE user.libraryCardNumber="${req.query['card-number']}" 
                            AND user.libraryCardNumber=customer.libraryCardNumber`;
      connection.query(customer_query , (err, row, fields) => {
        console.log("query", customer_query );
        console.log(row);
        // if there are items in the row array 
        if (row !== undefined && Object.keys(row).length != 0) {
          return res.status(200).json(
            {
              'type': 'customer', 
              'options': ['Checked out', 'Wish list', 'Reading history', 'Holds', 'Fees']
            }
          );
        } else {
          return res.status(502).json({error: 'Cannot find user'});
        }
      });
    }  
  });
})

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

// search all items by cal number with call number parameter from url
app.get('/search-all/:callNo', (req, res) => {
  connection.query(SELECT_ALL_QRY+ ' item WHERE author='+req.params.callNo, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// search all movies by director with director parameter from url
app.get('/search-all-movies/:director', (req, res) => {
  connection.query(SELECT_ALL_QRY+ ' movie WHERE director='+req.params.director, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// search all movies by actor with actor parameter from url
app.get('/search-all-movies/:actor', (req, res) => {
  connection.query(SELECT_ALL_QRY+ ' movie WHERE actor='+req.params.director, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// search all books by author with author parameter from url
app.get('/search-all-movies/:author', (req, res) => {
  connection.query(SELECT_ALL_QRY+ ' book WHERE author='+req.params.director, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

// remove item by call number from library
//TODO: test this
app.get('/remove-item/:callNum', (req, res) => {

  // delete from tables with callNum as foreign key first
  connection.query('DELETE FROM movie WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })

  connection.query('DELETE FROM book WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })

  connection.query('DELETE FROM borrows WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })

  connection.query('DELETE FROM hold WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })

  connection.query('DELETE FROM wishlist WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })

  // finally delete from item
  connection.query('DELETE FROM item WHERE callNumber='+ req.params.callNum, (err, row, fields) => {
    if (err) {console.log(err)}
    res.send(row)
  })
})

app.get("/api/user-info", (req, res) => {
  let authUser = JSON.parse(req.query['authUser']);

  let sql_query = `SELECT * FROM user
                    WHERE email="${authUser.email}"`;

  connection.query(sql_query, (err, row, fields) => {
    console.log(row);
    if (Object.keys(row).length != 0) {
      return res.status(200).json(row);
    }
    return res.status(502).json({error: 'No user found'});
  });
});

app.get("/api/wish-list", (req, res) => {
  // get card number of given authUser
  let userInfo = JSON.parse(req.query['userInfo']);
  let sql_query = `SELECT *
                    FROM item Item, wishlist 
                    WHERE Item.callNumber = wishlist.callNumber AND
                          libraryCardNumber IN (SELECT libraryCardNumber 
                                                FROM user 
                                                WHERE email="${userInfo['email']}")`; 
  connection.query(sql_query, (err, row, fields) => {
    console.log("begin query")
    console.log(row);
    if (Object.keys(row).length != 0) {
      console.log("row returned")
      return res.status(200).json(row);
    }
    console.log("Row NOT returned")
    return res.status(502).json({error: 'No items in wishlist'});
  });
})

app.get("/api/holds", (req, res) => {
  let userInfo = JSON.parse(req.query['userInfo']);

  let sql_query = `SELECT Item.name, holdDate
                  FROM item Item, hold WHERE hold.libraryCardNumber="${userInfo['libraryCardNumber']}"
                  AND Item.callNumber = hold.callNumber
                  AND hold.holdDate > NOW()`;
  connection.query(sql_query, (err, row, fields) => {
      console.log(row);
      if (Object.keys(row).length != 0) {
        return res.status(200).json(row);
      }
      return res.status(502).json({error: 'No items in holds'});
    });
})

app.get("/api/checked-out", (req, res) => {
  let userInfo = JSON.parse(req.query['userInfo']);
  let sql_query = `SELECT *
                  FROM item, borrows 
                  WHERE borrows.libraryCardNumber="${userInfo['libraryCardNumber']}"
                  AND item.callNumber = borrows.callNumber
                  AND borrows.returnDate IS NULL`;
  connection.query(sql_query, (err, row, fields) => {
      console.log(row);
      if (Object.keys(row).length != 0) {
        return res.status(200).json(row);
      }
      return res.status(502).json({error: 'No items currently checked out!'});
  });
})

// returns overdue items for frontend to calculate specific fees
app.get("/api/fees", (req, res) => {
  let userInfo = JSON.parse(req.query['userInfo']);

  // lateFee from item, overdue from borrows, libraryCardNumber from borrows
  let sql_query = `SELECT *
                  FROM item, borrows 
                  WHERE borrows.libraryCardNumber="${userInfo['libraryCardNumber']}"
                  AND borrows.overdue = true
                  AND borrows.callNumber = item.callNumber`;
  connection.query(sql_query, (err, row, fields) => {
    console.log(row);
    if (row !== undefined && Object.keys(row).length != 0) {
      return res.status(200).json(row);
    }
    return res.status(502).json({error: 'No overdue items!'});
  });
})

app.get("/api/reading-history", (req, res) => {
  let userInfo = JSON.parse(req.query['userInfo']);
  let sql_query = `SELECT Item.name, borrowDate, returnDate, numberRenewals, overdue 
                  FROM item Item, borrows WHERE libraryCardNumber="${userInfo['libraryCardNumber']}" 
                  AND returnDate < NOW()
                  AND Item.callNumber = borrows.callNumber`;
  connection.query(sql_query, (err, row, fields) => {
      console.log(row);
      if (Object.keys(row).length != 0) {
        return res.status(200).json(row);
      }
      return res.status(400).json({error: 'No items in reading history'});
    });
})

// POST requests
app.post("/api/holds", (req, res) => {
  console.log("begin route");
  let validation_query = `SELECT * FROM hold 
                          WHERE callNumber="${req.body['call-number']}" 
                          AND libraryCardNumber="${req.body['card-number']}"`;

  connection.query(validation_query, (err, row, fields) => {
    console.log("row",row);
    if (row === undefined || Object.keys(row).length === 0) {
      return insertToHolds(req, res);
    }
    return res.status(502).json({error: 'Item already in holds!'});
  });
})

insertToHolds = (req, res) => {
  debugger;
  console.log("begin inserting");
  let dueDate_query = `SELECT dueDate FROM borrows WHERE callNumber="${req.body['call-number']}"`;
  let dueDate;
  // get due date from borrows table
  connection.query(dueDate_query, (err, row, fields) => {
    console.log(row[0].dueDate);
    dueDate = row[0].dueDate;

    let sql_query = `INSERT INTO hold (holdDate, callNumber, libraryCardNumber) 
                    VALUES("${dueDate}", ${req.body['call-number']}, ${req.body['card-number']})`;
  
    // add to hold table with fetched dueDate attribute
    connection.query(sql_query, (err, row, fields) => {    
      if (Object.keys(row).length != 0) {
        let update_query = `UPDATE item SET status='on hold' WHERE callNumber="${req.body['call-number']}"`;
        connection.query(update_query, (err, row, fileds) => console.log(row));
        return res.status(200).json(row);
      }
      return res.status(502).json({error: 'No items posted to hold'});
    });
  });

}

// TODO: confirm PK of wishlist, currently not listed in MySQL
app.post("/api/wish-list", (req, res) => {
  let validation_query = `SELECT * FROM wishlist 
                          WHERE callNumber="${req.body['call-number']}" 
                          AND libraryCardNumber="${req.body['card-number']}"`;

  connection.query(validation_query, (err, row, fields) => {
    console.log(row);
    if (Object.keys(row).length === 0) {
      return insertToWishList(req, res);
    }
    return res.status(502).json({error: 'Item already in wishlist!'});
  });

})

insertToWishList = (req, res) => {
  let sql_query = `INSERT INTO wishlist VALUES(${req.body['call-number']}, ${req.body['card-number']})`;
  connection.query(sql_query, (err, row, fields) => {
      console.log(row);
      if (Object.keys(row).length !== 0) {
        return res.status(200).json(row);
      }
      return res.status(502).json({error: 'No items posted to wishlist'});
  });
}

app.post('/api/checked-out', (req, res) => {
  let item = req.body['item'];
  let today = new Date();
  let dueDate = new Date(item.dueDate);
  let oneDay = 24 * 60 * 60 * 1000; 

  console.log(item);
  // check if item is in holds
  if (item.status === 'on hold') {
    return res.status(502).json({error: 'Item cannot be renewed because it is placed on hold!'});
  } else if ( Math.round(Math.abs((dueDate - today) / oneDay)) <= 7) {
    return renewItem(req, res);
  } 
  return res.status(502).json({error: 'Too early to renew item!'});
})

renewItem = (req, res) => {
  let item = req.body['item'];
  // alter due date
  let dateString = getNewDate(item);
  // increment renewals
  // change overdue to false
  let sql_query = `UPDATE borrows SET 
                    dueDate="${dateString}",
                    numberRenewals="${item.numberRenewals + 1}", 
                    overdue=false
                    WHERE callNumber="${item.callNumber}"`;
  connection.query(sql_query, (err, row, fields) => {
    console.log(row);
    if (row !== undefined && Object.keys(row).length !== 0) {
      return res.status(200).json(row);
    }
    return res.status(502).json({error: 'No items renewed!'});
  });
}

getNewDate = (item) => {
  let dueDate = new Date(item.dueDate);
  // add loan period to current due date to update it
  dueDate.setDate(dueDate.getDate() + item.loanPeriod);
  // convert new date into string and return in this format: YYYY-MM-DD
  return dueDate.getUTCFullYear() + '-' + `${dueDate.getMonth() + 1}` + '-' + dueDate.getUTCDate();
}







//TODO: Update item status, validate that item is not checked out to another user. 
app.post('/api/check-out', (req, res) => {
  let CN = req.body['callNumber'];
  let LCN = req.body['libraryCardNumber'];
  let getItem = `SELECT * FROM item WHERE callNumber = "${CN}";`;
  let holdCheck = `SELECT * FROM hold WHERE callNumber ="${CN}" AND NOT libraryCardNumber ="${LCN}";`;

  connection.query(getItem, (err, rows, fields) => {
    if(rows.length === 1) {
      let item = rows[0]
      if(item.status === "loaned") {
        return res.status(200).send("That item is not available to be checked out.");
      } else {
        connection.query(holdCheck, (err, rows, fields) => {
          console.log("HOLD CHECK ROWS: ", rows.length)
          if(rows.length > 0) {
            return res.status(200).send("HOLD CHECK: That item is not available to be checked out.");
          } else {
            return checkOutItem(item, CN, LCN, res);    
          }
        })
      }
    }
  })
})




checkOutItem = (item, CN, LCN, res) => {
  let updateItem = `UPDATE item SET status = "loaned" WHERE callNumber = "${CN}";`;
  let borrow = `INSERT INTO borrows (borrowDate, dueDate, overdue, returnDate, numberRenewals, callNumber, libraryCardNumber)
                    VALUES (NOW(), DATE_ADD(NOW(), INTERVAL ${item.loanPeriod} DAY), 0, NULL, 0, ${CN}, ${LCN});`;
  console.log(item)
  console.log(updateItem)
  console.log(borrow)

  connection.query(borrow, (err, rows, fields) => {
    if(rows.affectedRows === 1) {
      connection.query(updateItem, (err, rows, fields) => {
        if(rows.affectedRows === 1) {
          return res.status(200).send(`User ${LCN} has borrowed ${CN}`);
        }
      })
    }              
  })
}
  





app.post('/api/check-in', (req, res) => {
  let isCheckedOut = `SELECT * FROM borrows 
               WHERE callNumber = "${req.body['CallNumber']}" 
               AND returnDate IS NULL;`;
  connection.query(isCheckedOut, (err, rows, fields) => {
    if (rows.length !== 0) {
      console.log(rows.length)
      console.log(rows[0].libraryCardNumber);
      let CN = req.body['CallNumber'];
      let LCN = rows[0].libraryCardNumber;
      let holdCheck = `SELECT * 
                       FROM hold 
                       WHERE callNumber ="${CN}" AND NOT libraryCardNumber ="${LCN}";`;
      connection.query(holdCheck, (err, rows, fields) => {
        if(rows.length > 0) {
          return checkInItem(res, CN, LCN, "on hold");
        } else {
          return checkInItem(res, CN, LCN, "available");
        }
      })                 
    } else {
      return res.status(200).send("That item is not currently checked out");
    }
  })
})


//TODO: Update Item Status, add applicable late fee to user account from the return
checkInItem = (res, CN, LCN, newStatus) => {
  let updateBorrows = `UPDATE borrows SET returnDate = NOW()
                       WHERE callNumber = "${CN}"
                       AND libraryCardNumber = "${LCN}";`;


  let updateItem = `UPDATE item SET status = "${newStatus}" WHERE callNumber = "${CN}";`;

  console.log(updateBorrows)
  console.log(updateItem)

  connection.query(updateBorrows, (err, rows, fields) => {
    console.log(rows)
    if(rows.changedRows === 1) {
      console.log("BORROWS UPDATED")
      connection.query(updateItem, (err, rows, fields) => {
        if(rows.changedRows === 1) {
          console.log("ITEM UPDATED")
          return res.status(200).send(`Item ${CN}s has been checked in.`)
        }
      })
    } else {
    return res.status(500).send('There was a problem checking in this item'); 
  }
  })
}








// add an item to the system
//TODO: need to finish + test
app.post('/api/add-item', (req, res) => {
  let item = req.body
  let addItem = `INSERT INTO item VALUES 
                ("${item.callNumber}", "${item.purchasePrice}", ${item.donated}, 
                 "${item.type}", "available", "${item.genre}", 
                 "${item.name}", "${item.releaseDate}", "${item.loanPeriod}", 
                 "${item.lateFee}");`;
  
  connection.query(`SELECT * FROM item WHERE callNumber = "${item.callNumber}";`, (err, rows, fields) => {
    if(rows.length === 0) {

      connection.query(addItem, (err, rows, fields) => {
        if(rows.affectedRows === 1) {
          
          if(item.type === "book") {
            connection.query(`INSERT INTO book VALUES 
              ("${item.callNumber}", "${item.author}");`, (err, rows, fields) => {
                return res.status(200).send("New Item successfully added");
              })
          } else if (item.type === "movie") {
            connection.query(`INSERT INTO book VALUES 
              ("${item.callNumber}", "${item.actor}", "${item.director}");`, (err, rows, fields) => {
                return res.status(200).send("New Item successfully added");               
              })
          } else {
            console.log("¯\_(ツ)_/¯")
          }

        }
      })
    } else {
      return res.status(200).send("Unable to add item");
    }
  })
})




// add a new user
app.post('/api/submit-new-user', (req, res) => {
  console.log(req.body);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    libraryCardNumber: Math.floor(Math.random() * 10000)  //TODO: ONLY TEMPORARY
  }
  connection.query(SELECT_ALL_QRY + 'user WHERE email="' + `${newUser.email}"`, (err, row, fields) => {
    if (row[0]) {
      console.log("user already exists", row);
      return res.status(400).send({error: 'user already exists'});
    } else {
      connection.query('INSERT INTO user SET ?', newUser);
      connection.query(`INSERT INTO customer 
                        VALUES(${newUser.libraryCardNumber}, 
                          NOW(), 
                          DATE_ADD(NOW(), INTERVAL 3 YEAR), 
                          '0.0')`
                      );
      return res.status(200).send({status: newUser.email + ' registered'});
    }
  });
})

// log in
// TODO use firebase to authenticate now!
app.post('/api/login', (req, res) => {
  console.log("inside login route")
  connection.query(SELECT_ALL_QRY + 'user WHERE email="' + `${req.body.email}"`, (err, row, fields) => {
    if (row[0]) {
      console.log(row[0])
      return res.status(200).json("valid user");
    } else {
      return res.status(400).json({error: 'Invalid User Credentials'});
    }
  });
})

app.listen(port, () => console.log(`Library Management app listening on port ${port}!`));
