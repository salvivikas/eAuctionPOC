var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var jwt = require('jsonwebtoken');

var pg = require('pg');
var connectionString = 'postgres://postgres:gotham123@localhost:5432/eAuction';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function (req, res, next) {
  //res.send('user authenticated - ' + req.body.username + ':' + req.body.password);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcd@123",
    database: "test"
  });

  var query = 'select * from test.usermaster where userid = ? and password = ?';

  con.query(query, [req.body.username, req.body.password], function (err, rows) {
    if (err) throw err;

    if (rows.length > 0) {
      var user = {
        id: rows[0].id,
        userid: rows[0].userid,
        userdisplayname: rows[0].userdisplayname,
        role: rows[0].role
      };
      /*
            // set expiration to 1 day
            var today = new Date();
            var exp = new Date(today);
            exp.setDate(today.getDate() + 1);
      
            var token = jwt.sign({
              userinfo: user,
              exp: parseInt(exp.getTime() / 1000),
            }, 'SECRET');
      */
      // return the information including token as JSON
      //res.send('user authenticated');
      res.json({
        success: true,
        userinfo: user
      });
    }
    else {
      res.json({
        success: false,
        token: null
      });
    }
  });
});

router.post('/authenticate_test', function (req, res, next) {
  var user = {
    id: 1,
    userid: 'vikas',
    userdisplayname: 'Vikas Salvi',
    role: 1
  };
  res.json({
    success: true,
    userinfo: user
  });
});


module.exports = router;
