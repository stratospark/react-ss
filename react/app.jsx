/** @jsx React.DOM */

var React = require('react'),
    NameList = require('./components/NameList.jsx');

var Button = require("react-bootstrap").Button,
    ButtonToolbar = require("react-bootstrap").ButtonToolbar,
    Grid = require("react-bootstrap").Grid,
    Row = require("react-bootstrap").Row,
    Col = require("react-bootstrap").Col,
    Nav = require("react-bootstrap").Nav,
    NavItem = require("react-bootstrap").NavItem;

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

    increment: function (e) {
        this.setState({counter: this.state.counter + 1});
    },

    decrement: function (e) {
        this.setState({counter: this.state.counter - 1});
    },

    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/stylesheets/style.css"/>
                    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
                </head>
                <body>

                    <Grid>
                        <Row>
                            <Col sm={3} md={3} class="sidebar">
                                <Nav bsStyle="pills" stacked activeKey={1}>
                                    <NavItem key={1} href="/home">Names</NavItem>
                                    <NavItem key={2} title="Item">TBD</NavItem>
                                    <NavItem key={3} disabled={true}>TBD</NavItem>
                                </Nav>

                            </Col>
                            <Col sm={9} md={9}>
                                <ButtonToolbar>
                                    <Button bsStyle="primary" bsSize="large" onClick={this.decrement}>Decrement</Button>
                                    <Button bsSize="large" onClick={this.increment}>Increment</Button>
                                    <span className="counter">{this.state.counter}</span>
                                </ButtonToolbar>

                                <h1>Name Options:</h1>
                                <NameList names={companyNames}/>
                            </Col>

                        </Row>
                    </Grid>


                    <script src="/javascripts/bundle.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = App;