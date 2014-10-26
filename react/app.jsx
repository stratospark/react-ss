/** @jsx React.DOM */

var React = require('react'),
    CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
    Maps = require("./routes/Maps.jsx"),
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
    Navbar = require("react-bootstrap").Navbar,
    NavItem = require("react-bootstrap").NavItem;



var Bar = React.createClass({
    render: function () {
        return (
            <Navbar staticTop={true}>
                <Nav bsStyle="pills" activeKey={1}>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="names">Names</Link>
                    </li>
                    <li>
                        <Link to="maps">Maps</Link>
                    </li>
                    <NavItem key={3} disabled={true}>Contact</NavItem>
                </Nav>
            </Navbar>
        );
    }
});

var App = React.createClass({
        render: function () {
            return (
                <html>
                    <head>
                        <link rel="stylesheet" type="text/css" href="/stylesheets/styles.css"/>
                        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
                    </head>
                    <body>
                        <Bar/>
                        <Grid>
                            <Row>
                                <Col sm={12} md={9}>
                                    <CSSTransitionGroup transitionName="example">
                                        <this.props.activeRouteHandler/>
                                    </CSSTransitionGroup>
                                </Col>
                            </Row>
                        </Grid>
                        <script src="/javascripts/bundle.js"></script>
                    </body>
                </html>
            )
        }
    })
    ;

var routes = (
    <Routes location="history">
        <Route name="app" path="/" handler={App}>
            <Route name="about" handler={About} addHandlerKey={true}/>
            <Route name="names" handler={Names} addHandlerKey={true} />
            <Route name="maps" handler={Maps} addHandlerKey={true}/>
            <DefaultRoute handler={About} />
        </Route>
    </Routes>
);

module.exports = {
    App: App,
    routes: routes
};