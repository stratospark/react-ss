/** @jsx React.DOM */
var React = require('react');
var Navigation = require("react-router").Navigation;
var AppPageFrame = require("./AppPageFrame.jsx");
var AppDispatcher = require("../../src/js/app-dispatcher");
var AppEvents = require("../../src/js/app-events");
var AppStore = require("../../src/js/app-store");

var Login = React.createClass({
        mixins: [Navigation],
        logoutComplete: function () {
            //console.log('logoutComplete');
            this.transitionTo('/login');
        },
        logout: function () {
            //console.log('logout requested');
            AppDispatcher.dispatchAction({
                event: AppEvents.fromView.logout,
            });
        },
        componentDidMount: function () {
            //console.log('componentDidMount');
            if (AppStore.session) {
                AppStore.bind(AppEvents.toView.logoutComplete, this.logoutComplete);
            }
            this.logout();
        },
        componentWillUnmount: function () {
            AppStore.unbind(AppEvents.toView.logoutComplete, this.logoutComplete);
        },
        render: function () {
            return (<div></div>);
        },
    }
);

module.exports = Login;