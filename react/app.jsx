/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var companyNames = "Consciousness, Love, React, Green, Imagine, Thought, Heart, App, Care, Web";

var MyUL = React.createClass({
    render: function () {
        var stuff = D.ul(null,
            companyNames.split(",").reverse().map(function (x) {
                return D.li(null, x)
            })
        );
        return (
            stuff
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/stylesheets/style.css"/>
                </head>
                <body>
                    <h1>Hello, this is React!</h1>
                    <h2>OK!</h2>
                    <p>ok</p>
                    <p>123</p>
                    <MyUL/>
                </body>
            </html>
        )
    }
});

module.exports = App;