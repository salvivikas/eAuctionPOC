var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../routes/config.json');

router.get('/getallcatalog', function (req, res, next) {

    var con = mysql.createConnection(connection);

    var query = 'select *, 0 as bidqty, 0 as bidstatus from test.catalogdetails order by catalogid limit 50';

    con.query(query, function (err, rows) {
        if (err) throw err;
        res.json(rows);

        // var sequence = [];
        // for (var i = 0; i < 50; i++) {
        //     sequence.push(i);
        // }
        // res.json({ data: rows, sequence: sequence });
    });
    /*
        var rows = [
            { catalogid: 1, lotno: 'L001', invoiceno: 'I001', mark: 'M001', teatype: 'T001', category: 'C001', grade: 'G001', baseprice: 15, quantityoffered: 100 },
            { catalogid: 2, lotno: 'L002', invoiceno: 'I002', mark: 'M002', teatype: 'T002', category: 'C002', grade: 'G002', baseprice: 15, quantityoffered: 100 },
            { catalogid: 3, lotno: 'L003', invoiceno: 'I003', mark: 'M003', teatype: 'T003', category: 'C003', grade: 'G003', baseprice: 15, quantityoffered: 100 },
            { catalogid: 4, lotno: 'L004', invoiceno: 'I004', mark: 'M004', teatype: 'T004', category: 'C004', grade: 'G004', baseprice: 15, quantityoffered: 100 },
            { catalogid: 5, lotno: 'L005', invoiceno: 'I005', mark: 'M005', teatype: 'T005', category: 'C005', grade: 'G005', baseprice: 15, quantityoffered: 100 },
            { catalogid: 6, lotno: 'L006', invoiceno: 'I006', mark: 'M006', teatype: 'T006', category: 'C006', grade: 'G006', baseprice: 15, quantityoffered: 100 },
            { catalogid: 7, lotno: 'L007', invoiceno: 'I007', mark: 'M007', teatype: 'T007', category: 'C007', grade: 'G007', baseprice: 15, quantityoffered: 100 },
            { catalogid: 8, lotno: 'L008', invoiceno: 'I008', mark: 'M008', teatype: 'T008', category: 'C008', grade: 'G008', baseprice: 15, quantityoffered: 100 },
            { catalogid: 9, lotno: 'L009', invoiceno: 'I009', mark: 'M009', teatype: 'T009', category: 'C009', grade: 'G009', baseprice: 15, quantityoffered: 100 },
            { catalogid: 10, lotno: 'L010', invoiceno: 'I010', mark: 'M010', teatype: 'T010', category: 'C010', grade: 'G010', baseprice: 15, quantityoffered: 10 },
            { catalogid: 11, lotno: 'L011', invoiceno: 'I011', mark: 'M011', teatype: 'T011', category: 'C011', grade: 'G011', baseprice: 15, quantityoffered: 10 },
            { catalogid: 12, lotno: 'L012', invoiceno: 'I012', mark: 'M012', teatype: 'T012', category: 'C012', grade: 'G012', baseprice: 15, quantityoffered: 10 },
            { catalogid: 13, lotno: 'L013', invoiceno: 'I013', mark: 'M013', teatype: 'T013', category: 'C013', grade: 'G013', baseprice: 15, quantityoffered: 10 },
            { catalogid: 14, lotno: 'L014', invoiceno: 'I014', mark: 'M014', teatype: 'T014', category: 'C014', grade: 'G014', baseprice: 15, quantityoffered: 10 },
            { catalogid: 15, lotno: 'L015', invoiceno: 'I015', mark: 'M015', teatype: 'T015', category: 'C015', grade: 'G015', baseprice: 15, quantityoffered: 10 },
            { catalogid: 16, lotno: 'L016', invoiceno: 'I016', mark: 'M016', teatype: 'T016', category: 'C016', grade: 'G016', baseprice: 15, quantityoffered: 10 },
            { catalogid: 17, lotno: 'L017', invoiceno: 'I017', mark: 'M017', teatype: 'T017', category: 'C017', grade: 'G017', baseprice: 15, quantityoffered: 10 },
            { catalogid: 18, lotno: 'L018', invoiceno: 'I018', mark: 'M018', teatype: 'T018', category: 'C018', grade: 'G018', baseprice: 15, quantityoffered: 10 },
            { catalogid: 19, lotno: 'L019', invoiceno: 'I019', mark: 'M019', teatype: 'T019', category: 'C019', grade: 'G019', baseprice: 15, quantityoffered: 10 },
            { catalogid: 20, lotno: 'L020', invoiceno: 'I020', mark: 'M020', teatype: 'T020', category: 'C020', grade: 'G020', baseprice: 15, quantityoffered: 10 },
            { catalogid: 21, lotno: 'L021', invoiceno: 'I021', mark: 'M021', teatype: 'T021', category: 'C021', grade: 'G021', baseprice: 15, quantityoffered: 10 },
            { catalogid: 22, lotno: 'L022', invoiceno: 'I022', mark: 'M022', teatype: 'T022', category: 'C022', grade: 'G022', baseprice: 15, quantityoffered: 10 },
            { catalogid: 23, lotno: 'L023', invoiceno: 'I023', mark: 'M023', teatype: 'T023', category: 'C023', grade: 'G023', baseprice: 15, quantityoffered: 10 },
            { catalogid: 24, lotno: 'L024', invoiceno: 'I024', mark: 'M024', teatype: 'T024', category: 'C024', grade: 'G024', baseprice: 15, quantityoffered: 10 },
            { catalogid: 25, lotno: 'L025', invoiceno: 'I025', mark: 'M025', teatype: 'T025', category: 'C025', grade: 'G025', baseprice: 15, quantityoffered: 10 },
            { catalogid: 26, lotno: 'L026', invoiceno: 'I026', mark: 'M026', teatype: 'T026', category: 'C026', grade: 'G026', baseprice: 15, quantityoffered: 10 },
            { catalogid: 27, lotno: 'L027', invoiceno: 'I027', mark: 'M027', teatype: 'T027', category: 'C027', grade: 'G027', baseprice: 15, quantityoffered: 10 },
            { catalogid: 28, lotno: 'L028', invoiceno: 'I028', mark: 'M028', teatype: 'T028', category: 'C028', grade: 'G028', baseprice: 15, quantityoffered: 10 },
            { catalogid: 29, lotno: 'L029', invoiceno: 'I029', mark: 'M029', teatype: 'T029', category: 'C029', grade: 'G029', baseprice: 15, quantityoffered: 10 },
            { catalogid: 30, lotno: 'L030', invoiceno: 'I030', mark: 'M030', teatype: 'T030', category: 'C030', grade: 'G030', baseprice: 15, quantityoffered: 10 },
            { catalogid: 31, lotno: 'L031', invoiceno: 'I031', mark: 'M031', teatype: 'T031', category: 'C031', grade: 'G031', baseprice: 15, quantityoffered: 10 },
            { catalogid: 32, lotno: 'L032', invoiceno: 'I032', mark: 'M032', teatype: 'T032', category: 'C032', grade: 'G032', baseprice: 15, quantityoffered: 10 },
            { catalogid: 33, lotno: 'L033', invoiceno: 'I033', mark: 'M033', teatype: 'T033', category: 'C033', grade: 'G033', baseprice: 15, quantityoffered: 10 },
            { catalogid: 34, lotno: 'L034', invoiceno: 'I034', mark: 'M034', teatype: 'T034', category: 'C034', grade: 'G034', baseprice: 15, quantityoffered: 10 },
            { catalogid: 35, lotno: 'L035', invoiceno: 'I035', mark: 'M035', teatype: 'T035', category: 'C035', grade: 'G035', baseprice: 15, quantityoffered: 10 },
            { catalogid: 36, lotno: 'L036', invoiceno: 'I036', mark: 'M036', teatype: 'T036', category: 'C036', grade: 'G036', baseprice: 15, quantityoffered: 10 },
            { catalogid: 37, lotno: 'L037', invoiceno: 'I037', mark: 'M037', teatype: 'T037', category: 'C037', grade: 'G037', baseprice: 15, quantityoffered: 10 },
            { catalogid: 38, lotno: 'L038', invoiceno: 'I038', mark: 'M038', teatype: 'T038', category: 'C038', grade: 'G038', baseprice: 15, quantityoffered: 10 },
            { catalogid: 39, lotno: 'L039', invoiceno: 'I039', mark: 'M039', teatype: 'T039', category: 'C039', grade: 'G039', baseprice: 15, quantityoffered: 10 },
            { catalogid: 40, lotno: 'L040', invoiceno: 'I040', mark: 'M040', teatype: 'T040', category: 'C040', grade: 'G040', baseprice: 15, quantityoffered: 10 },
            { catalogid: 41, lotno: 'L041', invoiceno: 'I041', mark: 'M041', teatype: 'T041', category: 'C041', grade: 'G041', baseprice: 15, quantityoffered: 10 },
            { catalogid: 42, lotno: 'L042', invoiceno: 'I042', mark: 'M042', teatype: 'T042', category: 'C042', grade: 'G042', baseprice: 15, quantityoffered: 10 },
            { catalogid: 43, lotno: 'L043', invoiceno: 'I043', mark: 'M043', teatype: 'T043', category: 'C043', grade: 'G043', baseprice: 15, quantityoffered: 10 },
            { catalogid: 44, lotno: 'L044', invoiceno: 'I044', mark: 'M044', teatype: 'T044', category: 'C044', grade: 'G044', baseprice: 15, quantityoffered: 10 },
            { catalogid: 45, lotno: 'L045', invoiceno: 'I045', mark: 'M045', teatype: 'T045', category: 'C045', grade: 'G045', baseprice: 15, quantityoffered: 10 },
            { catalogid: 46, lotno: 'L046', invoiceno: 'I046', mark: 'M046', teatype: 'T046', category: 'C046', grade: 'G046', baseprice: 15, quantityoffered: 10 },
            { catalogid: 47, lotno: 'L047', invoiceno: 'I047', mark: 'M047', teatype: 'T047', category: 'C047', grade: 'G047', baseprice: 15, quantityoffered: 10 },
            { catalogid: 48, lotno: 'L048', invoiceno: 'I048', mark: 'M048', teatype: 'T048', category: 'C048', grade: 'G048', baseprice: 15, quantityoffered: 10 },
            { catalogid: 49, lotno: 'L049', invoiceno: 'I049', mark: 'M049', teatype: 'T049', category: 'C049', grade: 'G049', baseprice: 15, quantityoffered: 10 },
            { catalogid: 50, lotno: 'L050', invoiceno: 'I050', mark: 'M050', teatype: 'T050', category: 'C050', grade: 'G050', baseprice: 15, quantityoffered: 10 },
        ];
    var sequence = [];
    for (var i = 0; i < 50; i++) {
        sequence.push(i);
    }
    res.json({ data: rows, sequence: sequence });*/
});

router.post('/insertbid', function (req, res, next) {
    console.log(req.body.userid + '   ' + req.body.catalogid + '   ' + req.body.bidqty);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "abcd@123",
        database: "test"
    });

    var query = 'INSERT INTO test.bids(userid,catalogid,bidqty)VALUES(?,?,?);';

    con.query(query, [req.body.userid, req.body.catalogid, req.body.bidqty], function (err, result) {
        if (err) throw err;

        res.json(result.insertId);
    });
});
module.exports = router;
