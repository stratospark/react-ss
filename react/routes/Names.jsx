/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var NameList = require('../components/NameList.jsx'),
    Button = require("react-bootstrap").Button,
    Input = require("react-bootstrap").Input,
    ButtonToolbar = require("react-bootstrap").ButtonToolbar;
var AppPageFrame = require("../components/AppPageFrame.jsx");


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
    checkBoxHandler: function () {
        console.log('checkbox handler');
    },
    render: function () {
        return (
            <AppPageFrame>
                <h1>Names</h1>
                <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" onClick={this.decrement}>Decrement</Button>
                    <Button bsSize="large" onClick={this.increment}>Increment</Button>
                    <span className="counter">{this.state.counter}</span>
                    <Input type="checkbox" label='Check Box' onChange={this.checkBoxHandler}/>
                    <Input type="textarea" label='Text Area' defaultValue='Insert text here'/>
                </ButtonToolbar>
                <h1>Name Options:</h1>
                <NameList names={companyNames}/>
            </AppPageFrame>
        );
    }
});

module.exports = Names;