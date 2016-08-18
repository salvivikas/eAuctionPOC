module.exports = function (io) {
    var mysql = require('mysql');
    var connection = require('../routes/config.json');
    var catalogs = [];
    var count = 0;
    var io = io;
    var timerStarted = false;
    var interval = 0;

    var getCount = function () {
        count++;
        return count;
    };

    var loadCatalog = function () {
        var con = mysql.createConnection(connection);

        var query = 'select *, 0 as bidqty, 0 as bidstatus from test.catalogdetails order by catalogid limit 50';

        con.query(query, function (err, rows) {
            if (err) throw err;

            catalogs = rows;
        });
    };

    var startTimer = function () {
        if (!timerStarted) {
            var con = mysql.createConnection(connection);
            var query = 'delete from test.bids where bidid > 0'; // Delete all previous bids
            con.query(query, function (err, rows) {
                io.emit('send:startsession', 0);
                interval = setInterval(function () { // setInterval setTimeout
                    // if (count == 0) {
                    //     io.emit('send:startsession', 0);
                    // }

                    var con = mysql.createConnection(connection);
                    // Select top 5 unsold lots
                    //var query = 'select  * from test.catalogdetails where catalogid not in (select distinct catalogid from test.bids) order by catalogid';

                    // Select the lots with pending qty
                    var query = 'select  catalogid,lotno,invoiceno,mark,teatype,category,grade,baseprice, \
                                    (c.quantityoffered - ifnull((select sum(bidqty) from test.bids group by userid,catalogid having catalogid= c.catalogid),0)) as quantityoffered \
                                    from test.catalogdetails c \
                                    where c.quantityoffered > ifnull((select sum(bidqty) from test.bids group by userid,catalogid having catalogid= c.catalogid),0) \
                                    order by c.catalogid';

                    con.query(query, function (err, rows) {
                        if (err) throw err;

                        if (rows.length == 0) {
                            clearInterval(interval); // stop session
                            io.emit('send:stopsession', 0);
                        }
                        else {
                            io.emit('send:changelot', rows);
                        }
                    });

                    console.log('setinterval - ' + count);
                    count++;
                }, 30000);
                timerStarted = true;
            });
        }
    };

    // Start the session after 20 seconds
    setTimeout(function () {
        startTimer();
    }, 8000);

    loadCatalog();
}