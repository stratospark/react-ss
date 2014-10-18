/** @jsx React.DOM */

var React = require('react'),
    About = require('./routes/About.jsx'),
    Names = require('./routes/Names.jsx');

var Routes = require("react-router").Routes,
    Route = require("react-router").Route,
    DefaultRoute = require("react-router").DefaultRoute,
    Link = require("react-router").Link;

var Grid = require("react-bootstrap").Grid,
    Row = require("react-bootstrap").Row,
    Col = require("react-bootstrap").Col,
    Nav = require("react-bootstrap").Nav,
    NavItem = require("react-bootstrap").NavItem;



var App = React.createClass({
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
                            <Col sm={3} md={3} className="sidebar">
                                <Nav bsStyle="pills" stacked activeKey={1}>
                                    <li><Link to="about">About</Link></li>
                                    <li><Link to="names">Names</Link></li>
                                    <NavItem key={3} disabled={true}>Contact</NavItem>
                                </Nav>

                            </Col>
                            <Col sm={9} md={9}>
                                <this.props.activeRouteHandler/>

                            </Col>

                        </Row>
                    </Grid>


                    <script src="/javascripts/bundle.js"></script>
                </body>
            </html>
        )
    }
});

var routes = (
    <Routes location="hash">
        <Route name="app" path="/" handler={App}>
            <Route name="about" handler={About} />
            <Route name="names" handler={Names} />
            <DefaultRoute handler={About} />
        </Route>
    </Routes>
);

module.exports = {
    App: App,
    routes: routes
};