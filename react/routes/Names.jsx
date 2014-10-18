/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var NameList = require('../components/NameList.jsx'),
    Button = require("react-bootstrap").Button,
    ButtonToolbar = require("react-bootstrap").ButtonToolbar;


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

var Names = React.createClass({
    getInitialState: function () {
        return {
            counter: 1
        }
    },

    increment: function (e) {
        this.setState({counter: this.state.counter + 1});
    },

    decrement: function (e) {
        this.setState({counter: this.state.counter - 1});
    },

    render: function () {
        return (
            <div>
                <h1>Names</h1>
                <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" onClick={this.decrement}>Decrement</Button>
                    <Button bsSize="large" onClick={this.increment}>Increment</Button>
                    <span className="counter">{this.state.counter}</span>
                </ButtonToolbar>

                <h1>Name Options:</h1>
                <NameList names={companyNames}/>
            </div>
        );
    }
});

module.exports = Names;