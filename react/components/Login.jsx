/** @jsx React.DOM */
var React = require('react');
var Navigation = require("react-router").Navigation;
var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var AppPageFrame = require("./AppPageFrame.jsx");
var AppDispatcher = require("../../src/js/app-dispatcher");
var AppEvents = require("../../src/js/app-events");
var AppStore = require("../../src/js/app-store");

var Login = React.createClass({
        mixins: [Navigation],
        panelDefault: {
            title: "Login - use 'email' and 'psw' (for now)",
            style: 'primary'
        },
        getInitialState: function () {
            return {
                panel: this.panelDefault,
                // email: 'email',
                // psw: 'psw'
            };
        },
        panelTimeoutAbort: function () {
            if (this.panelSetTimeout) {
                //console.log('aborting panel msg', this.panelSetTimeout);
                window.clearTimeout(this.panelSetTimeout);
                this.panelSetTimeout = null;
            }
        },
        panelSet: function (cfg) {
            this.setState({panel: cfg});
            this.panelTimeoutAbort();
            this.panelSetTimeout = window.setTimeout(function () {
                this.setState({panel: this.panelDefault});
                this.panelSetTimeout = null;
            }.bind(this), 5000);
        },
        login: function () {
            //console.log('login started', this.state.email, this.state.psw);
            if (this.canLogin()) {
                this.setState({panel: {title: 'Authenticating...', style: 'info'}});
                AppDispatcher.dispatchAction({
                    event: AppEvents.fromView.login,
                    email: this.state.email,
                    psw: this.state.psw
                });
            } else {
                this.panelSet({
                    title: 'Empty email or password!',
                    style: 'warning'
                });
            }
        },
        handleEmailChange: function () {
            var value = this.refs.email.getValue();
            this.setState({email: value});
            //console.log('handleEmailChange', value);
        },
        handlePswChange: function () {
            var value = this.refs.psw.getValue();
            this.setState({psw: value});
            //console.log('handlePswChange', value);
        },
        loginReply: function (success) {
            //console.log('login success', success);
            if (success) {
                this.transitionTo('/about');
            } else {
                this.panelSet({
                    title: 'Incorrect email or password!',
                    style: 'danger'
                });
            }
        },
        onKeyPress: function (ev) {
            //console.log('keyup', ev.type, ev.which);
            ev.which === 13 && this.login();
        },
        canLogin: function () {
            return this.state.email && this.state.psw;
        },
        componentDidMount: function () {
            //console.log('componentDidMount', this.refs.email);
            this.refs.email.getInputDOMNode().focus();
            AppStore.bind(AppEvents.toView.loginReply, this.loginReply);
        },
        componentWillUnmount: function () {
            //console.log('componentWillUnmount');
            AppStore.unbind(AppEvents.toView.loginReply, this.loginReply);
            this.panelTimeoutAbort();
        },
        render: function () {
            return (
                <AppPageFrame>
                    <Panel header={this.state.panel.title} bsStyle={this.state.panel.style}>
                        <Input
                            ref='email'
                            value={this.state.email}
                            type='email'
                            onChange={this.handleEmailChange}
                            placeholder='Email'
                            onKeyPress={this.onKeyPress}
                            autoFocus
                        />
                        <Input
                            ref='psw'
                            type='password'
                            placeholder='Password'
                            onChange={this.handlePswChange}
                            onKeyPress={this.onKeyPress}
                        />
                        <Button
                            onClick={this.login}
                            bsSize='large'
                            bsStyle={this.canLogin() ? 'success' : 'warning'}>
                            Login
                        </Button>
                    </Panel>
                </AppPageFrame>
            );
        },
    }
);

module.exports = Login;