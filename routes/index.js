
var express = require('express'),
    React = require('react'),
    Router = require('react-router'),
    routes = require('../react/app.jsx').routes;

var router = express.Router();

router.get("*", function (req, res) {
    Router.renderRoutesToString(routes, req.path, function(e, ar, s) {
            res.send(s);
    })

});

module.exports = router;
