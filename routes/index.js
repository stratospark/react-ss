
var express = require('express'),
    React = require('react'),
    App = require('../react/app.jsx');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get("/react", function (req, res) {
    res.end(React.renderComponentToString(App()));
});

module.exports = router;
