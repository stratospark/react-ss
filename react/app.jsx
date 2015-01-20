/** @jsx React.DOM */

var React = require('react'),
    CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
    About = require('./routes/About.jsx'),
    Names = require('./routes/Names.jsx');

var Router = require("react-router");
var Routes = Router.Routes,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link;
var Nav = require("react-bootstrap").Nav,
    Navbar = require("react-bootstrap").Navbar,
    Glyphicon = require("react-bootstrap").Glyphicon,
    NavItem = require("react-bootstrap").NavItem;
var AppDispatcher = require("../src/js/app-dispatcher");
var AppStore = require("../src/js/app-store");
var AppEvents = require('../src/js/app-events');
var AppPageFrame = require("./components/AppPageFrame.jsx");
var Login = require("./components/Login.jsx");
var Logout = require("./components/Logout.jsx");

var Hammer = typeof(document) !== "undefined" ? require('hammerjs') : null;

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

var routesData = [
    {title: "About", path: "about", handler: About, default: true},
    {title: "Names", path: "names", handler: Names},
    {title: "Contact", path: "contact", handler: Contact},
    {title: "Login", path: "login", handler: Login},
    {title: "Logout", path: "logout", handler: Logout},
];

function preventEventBubbleUp(domNode) {
    domNode.addEventListener('touchend', function (ev) {
        // hack to keep the events from bubbling up
        ev.stopPropagation();
    });
}

var barMixin = {
    mixins: [Router.CurrentPath],
    getInitialState: function () {
        return {visible: false};
    },
    setVisible: function (state) {
        //console.log('setVisible', this.title, state);
        this.setState({visible: state});
    },
    menuLinksGet: function () {
        var links = routesData.map(function (route, index) {
            // in case skipping active route is desired
            //if (this.getCurrentPath() === ('/' + route.path)) {
            //    return null;
            //}
            if ((route.path == 'login' && AppStore.session) ||
                (route.path == 'logout' && !AppStore.session)) {
                return null;
            }
            return (
                <li key={index}>
                    <Link to={route.path}>{route.title}</Link>
                </li>
            );
        }.bind(this));
        links = links.filter(function (entry) {
            return !!entry;
        });
        //console.log('menu links', links);
        return links;
    },
};

var TopBarBtn = React.createClass({
    getInitialState: function () {
        return {visible: true};
    },
    setVisible: function (state) {
        this.setState({visible: !state})
    },
    activate: function (ev) {
        //console.log("topBar activate", ev);
        AppDispatcher.dispatchAction({event: AppEvents.fromView.topBarActivate});
    },
    componentDidMount: function () {
        //console.log('TopBar componentDidMount');
        AppStore.bind(AppEvents.toView.topBarVisible, this.setVisible);
        var domNode = this.getDOMNode();
        preventEventBubbleUp(domNode);
        var h = new Hammer(domNode);
        h.on('tap', this.activate);
    },
    componentWillUnmount: function () {
        AppStore.unbind(AppEvents.toView.topBarVisible, this.setVisible);
    },
    render: function () {
        var classes = "topbar-btn";
        classes += " " + (this.state.visible ? "topbar-btn-visible" : "topbar-btn-invisible");
        return (
            <Glyphicon glyph="th-list" onClick={this.activate} className={classes}/>
        );
    }
});

var TopBar = React.createClass({
    title: 'topBar',
    mixins: [barMixin],
    componentDidMount: function () {
        //console.log('TopBar componentDidMount');
        AppStore.bind(AppEvents.toView.topBarVisible, this.setVisible);
        var domNode = this.getDOMNode();
        preventEventBubbleUp(domNode);
        var h = new Hammer(domNode);
        h.on('tap', function (ev) {
            //console.log("topBar tap", ev);
            AppDispatcher.dispatchAction({event: AppEvents.fromView.topBarTap});
        });
    },
    componentWillUnmount: function () {
        AppStore.unbind(AppEvents.toView.topBarVisible, this.setVisible);
    },
    render: function () {
        var classes = "topbar";
        classes += " " + (this.state.visible ? "topbar-visible" : "topbar-invisible");
        return (
            <Navbar staticTop={true} className={classes}>
                <Nav bsStyle="pills" activeKey={1}>
                { this.menuLinksGet() }
                </Nav>
            </Navbar>
        );
    }
});

var SideBar = React.createClass({
    title: 'sideBar',
    mixins: [barMixin],
    componentDidMount: function () {
        //console.log('SideBar componentDidMount');
        AppStore.bind(AppEvents.toView.sideBarVisible, this.setVisible);
        var domNode = this.getDOMNode();
        preventEventBubbleUp(domNode);
        var h = new Hammer(domNode, {domEvents: true});
        h.on('swipeleft', function (ev) {
            //console.log("swipeleft", ev);
            AppDispatcher.dispatchAction({event: AppEvents.fromView.globSwipe, direction: 'left'});
        }.bind(this));
    },
    componentWillUnmount: function () {
        AppStore.unbind(AppEvents.toView.sideBarVisible, this.setVisible);
    },
    render: function () {
        var classes = "sidebar ";
        classes += this.state.visible ? "sidebar-visible" : "sidebar-invisible";
        return (
            <div className={classes}>
                <ul>
                    { this.menuLinksGet() }
                </ul>
            </div>
        );
    }
});

var App = React.createClass({
    navHideTimeoutId: null,
    componentDidMount: function () {
        var fromView = AppEvents.fromView;
        var h = new Hammer(this.getDOMNode());
        h.get('swipe').set({
            threshold: 5,
            velocity: 0.1,
        });
        h.on('swipeleft', function (ev) {
            //console.log("swipeleft", ev);
            AppDispatcher.dispatchAction({event: fromView.globSwipe, direction: 'left'});
        }.bind(this));
        h.on('swiperight', function (ev) {
            //console.log("swiperight", ev);
            AppDispatcher.dispatchAction({event: fromView.globSwipe, direction: 'right'});
        }.bind(this));
        h.on('tap', function (ev) {
            //console.log("App tap", ev);
            AppDispatcher.dispatchAction({event: fromView.globTap});
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
                    <TopBarBtn/>
                    <CSSTransitionGroup transitionName="page-transition" className="app-page">
                        <this.props.activeRouteHandler/>
                    </CSSTransitionGroup>
                    <script src="/javascripts/bundle.js"></script>
                </body>
            </html>
        );
    }
});

module.exports = {
    routes: function routesCreate() {
        var defaultHandler;
        var routeList = routesData.map(function (route, index) {
            route.default && (defaultHandler = route.handler);
            return (
                <Route key={index} name={route.path} handler={route.handler}/>
            );
        });
        routeList.push(<DefaultRoute key={routeList.length} handler={defaultHandler}/>);
        return (
            <Routes location="history">
                <Route name="app" path="/" handler={App}>
                    {routeList}
                </Route>
            </Routes>
        );
    }()
};