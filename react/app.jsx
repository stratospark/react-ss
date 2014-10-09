/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var companyNames = [
    "Consciousness",
    "Love",
    "React",
    "Green",
    "Imagine",
    "Thought",
    "Heart",
    "App",
    "Care",
    "Web",
    "foxyline",
    "foxyware",
    "featherath",
    "popmachine",
    "animalware",
    "animooless",
    "plantify",
    "sproutanapp",
    "webiland",
    "planect",
    "planex",
    "planless",
    "hobful",
    "jabless",
    "plopy",
    "flopy",
    "diskful",
    "economore",
    "inapt",
    "cloudless",
    "cloppy",
    "klaudmess",
    "inaklud",
    "apperclass",
    "uppleklass",
    "appernity",
    "appurself"
];

var NameList = React.createClass({
    render: function () {
        var stuff = D.ol(null,
            companyNames.map(function (x) {
                return D.li(null, x)
            })
        );
        return (
            stuff
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            counter: 1
        }
    },

    onClick: function (e) {
        this.setState({counter: this.state.counter + 1});
    },

    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/stylesheets/style.css"/>
                </head>
                <body>
                    <p>{this.state.counter}</p>
                    <button onClick={this.onClick}>Increment</button>
                    <h1>Name Options:</h1>
                    <NameList/>
                    <script src="/javascripts/bundle.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = App;