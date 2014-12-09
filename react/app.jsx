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
var AppDispacher = require("../src/js/app-dispatcher");
var AppStore = require("../src/js/app-store");

var TopBar = React.createClass({
    getInitialState: function () {
        return {visible: false};
    },
    setVisible: function (state) {
        //console.log('TopBar setVisible', state);
        this.setState({visible: state});
    },
    componentDidMount: function () {
        //console.log('TopBar componentDidMount');
        AppStore.bind('topBarVisible', this.setVisible);
    },
    componentWillUnmount: function () {
        AppStore.unbind('topBarVisible', this.setVisible);
    },
    render: function () {
        var classes = "app-nav";
        classes += " " + (this.state.visible ? "bar-visible" : "bar-invisible");
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

var SideBar = React.createClass({
    getInitialState: function () {
        return {visible: false};
    },
    setVisible: function (state) {
        //console.log('SideBar setVisible', state);
        this.setState({visible: state});
    },
    componentDidMount: function () {
        //console.log('SideBar componentDidMount');
        AppStore.bind('sideBarVisible', this.setVisible);
    },
    componentWillUnmount: function () {
        AppStore.unbind('sideBarVisible', this.setVisible);
    },
    render: function () {
        var classes = "app-sidebar ";
        classes += this.state.visible ? "sidebar-visible" : "sidebar-invisible";
        return (
            <div className={classes}>
                <ul>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="names">Names</Link>
                    </li>
                    <li>
                        <Link to="contact">Contact</Link>
                    </li>
                </ul>
            </div>
        );
    }
});

var App = React.createClass({
    navHideTimeoutId: null,
    componentDidMount: function () {
        var Hammer = require('hammerjs');
        var h = new Hammer(this.getDOMNode());
        h.get('swipe').set({
            threshold: 5,
            velocity: 0.1,
        });
        h.on('swipeleft', function (event) {
            //console.log("swipeleft", event);
            AppDispacher.dispatchAction({event: 'viewSwipe', direction: 'left'});
        }.bind(this));
        h.on('swiperight', function (event) {
            //console.log("swiperight", event);
            AppDispacher.dispatchAction({event: 'viewSwipe', direction: 'right'});
        }.bind(this));
        h.on('tap', function (state) {
            AppDispacher.dispatchAction({event: 'viewTap'});
        });
    },
    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/stylesheets/styles.css"/>
                    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                </head>
                <body className="app-body" >
                    <TopBar/>
                    <SideBar/>
                    <CSSTransitionGroup transitionName="page-transition" className="app-page">
                        <this.props.activeRouteHandler/>
                    </CSSTransitionGroup>
                    <script src="/javascripts/bundle.js"></script>
                </body>
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
    routes: routes
};