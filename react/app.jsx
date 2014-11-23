/** @jsx React.DOM */

var React = require('react'),
    CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
    About = require('./routes/About.jsx'),
    Names = require('./routes/Names.jsx');

var Routes = require("react-router").Routes,
    Route = require("react-router").Route,
    DefaultRoute = require("react-router").DefaultRoute,
    Link = require("react-router").Link;

var Nav = require("react-bootstrap").Nav,
    Navbar = require("react-bootstrap").Navbar,
    NavItem = require("react-bootstrap").NavItem;
var Swiper = require("react-swiper");

var Bar = React.createClass({
    render: function () {
        var classes = "app-nav";
        classes += " " + (this.props.show ? "bar-visible" : "bar-invisible");
        return (
            <Navbar staticTop={true} className={classes}>
                <Nav bsStyle="pills" activeKey={1}>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="names">Names</Link>
                    </li>
                    <li>
                        <Link to="contact">Contact</Link>
                    </li>
                </Nav>
            </Navbar>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {navbarVisible: false};
    },
    showNav: function () {
        if (!this.state.navbarVisible) {
            this.setState({navbarVisible: true});
            console.log("showing navbar");
            setTimeout(function () {
                console.log("hiding navbar");
                this.setState({navbarVisible: false});
            }.bind(this), 4000);
        }
    },
    handleSwipe: function (event) {
        console.log("handleSwipe", event);
        switch (event.type) {
            case "swipeLeft":
            case "swipeRight":
                this.showNav();
                break;
        }
    },
    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/stylesheets/styles.css"/>
                    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                </head>
                <Swiper tagName="body" className="app-body" onClick={this.showNav} onSwipe={this.handleSwipe}>
                    <Bar show={this.state.navbarVisible} />
                    <CSSTransitionGroup transitionName="page-transition" className="app-page">
                        <this.props.activeRouteHandler/>
                    </CSSTransitionGroup>
                    <script src="/javascripts/bundle.js"></script>
                </Swiper>
            </html>
        )
    }
});

var AppPageFrame = require("./components/AppPageFrame.jsx");

var Contact = React.createClass({
        render: function () {
            return (
                <AppPageFrame>
                    <h2>Contact Us</h2>
                    <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>
                </AppPageFrame>
            );
        }
    }
);

var routes = (
    <Routes location="history">
        <Route name="app" path="/" handler={App}>
            <Route name="about" handler={About} addHandlerKey={true}/>
            <Route name="names" handler={Names} addHandlerKey={true} />
            <Route name="contact" handler={Contact} addHandlerKey={true} />
            <DefaultRoute handler={About} />
        </Route>
    </Routes>
);

module.exports = {
    App: App,
    routes: routes
};