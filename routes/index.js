
var express = require('express'),
    React = require('react'),
    Router = require('react-router'),
    routes = require('../react/app.jsx').routes;

var router = express.Router();

///* GET home page. */
//router.get('/', function (req, res) {
//    res.render('index', {title: 'Express'});
//});

router.get("*", function (req, res) {
    if(req.url == '/favicon.ico'){
        return res.status(404).end();
    }
    Router.renderRoutesToString(routes, req.path, function(e, ar, s) {
            res.send(s);
    })

});

module.exports = router;
