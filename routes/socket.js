/*
var auctionSessions = function () {
    var count = 0;
    var timerStarted = false;
    var timer = 0;

    var changeLot = function () {
        count++;
    }

    var startTimer = function () {
        if (!timerStarted) {
            timer = setInterval(function () {
                console.log('setinterval - ' + count);
                socket.emit('send:changelot', count++);
                // if (count > 4) {
                //     count = 0;
                // }
            }, 5000);
            timerStarted = true;
        }
    }
}
*/
// Serve content over a socket
module.exports = function (socket) {
    var count = 0;
    var timerStarted = false;

    console.log('Socket connected');
    socket.emit('init', 'init');
    // socket.emit('send:sessionstart', 0);
    // socket.emit('send:changelot', count);

    socket.on('send:changelot', function (data) {
        console.log('send:changelot - ' + data);
        socket.broadcast.emit('send:changelot', data);
    });
/*
    var startSession = function () {
        if (!timerStarted) {
            setInterval(function () {
                console.log('setinterval - ' + count);
                socket.emit('send:changelot', count++);
                // if (count > 4) {
                //     count = 0;
                // }
            }, 5000);
            timerStarted = true;
        }
    }

    startSession();*/
};