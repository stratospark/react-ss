/** @jsx React.DOM */

var React = require('react'),
    NameList = require('./components/NameList.jsx');

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
                    <NameList names={companyNames}/>
                    <script src="/javascripts/bundle.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = App;