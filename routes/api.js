var express = require('express');
var router = express.Router();

router.route('/login')
    .post(function (req, res) {
        var body = req.body;
        console.log('login', body);
        var reply =
            (body.email === 'email' && body.psw === 'psw') ? {
                message: 'login successful',
                sessionToken: 123456
            } : {
                message: 'login failed'
            };
        res.send(reply);
    });

router.route('/logout')
    .post(function (req, res) {
        var body = req.body;
        console.log('logout', body);
        var reply = body.sessionToken ? {message: 'logout successful'} : {message: 'login failed'};
        res.send(reply);
    });

router.param('userid', function (req, res, next, userid) {
    console.log('rcvd userid', userid);
    req.userid = userid;
    next();
});

router.route('/users/:userid')
    .get(function (req, res) {
        res.send({method: 'get', userid: req.userid});
    })
    .put(function (req, res) {
        res.send({method: 'put', userid: req.userid});
    })
    .post(function (req, res) {
        res.send({method: 'post', userid: req.userid});
    })
    .delete(function (req, res) {
        res.send({method: 'delete', userid: req.userid});
    });

module.exports = router;
