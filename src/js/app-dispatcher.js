var Dispatcher = require('flux').Dispatcher;
var appEvents = require('./app-events');
var actions = appEvents.actions;
var fromView = appEvents.fromView;

var AppDispatcher = new Dispatcher();
var pageFrameMountedTimeoutId = null;
var topBarLingerTimeMs = 5000;

AppDispatcher.dispatchAction = function eventTrigger(payload) {
    //console.log('eventTrigger', payload);
    switch (payload.event) {
        case fromView.globSwipe:
            this.dispatch({
                action: actions.sideBarState,
                state: (payload.direction === 'right' ? 'show' : 'hide')
            });
            break;
        case fromView.globTap:
            this.dispatch({action: actions.topBarState, state: 'hide'});
            this.dispatch({action: actions.sideBarState, state: 'hide'});
            break;
        case fromView.topBarTap:
            this.dispatch({action: actions.topBarState, state: 'show'});
            break;
        case fromView.pageFrameMounted:
            if (pageFrameMountedTimeoutId) {
                window.clearTimeout(pageFrameMountedTimeoutId);
                pageFrameMountedTimeoutId = null;
            }
            pageFrameMountedTimeoutId = window.setTimeout(function () {
                this.dispatch({action: actions.topBarState, state: 'hide'});
                pageFrameMountedTimeoutId = null;
            }.bind(this), topBarLingerTimeMs);
            this.dispatch({action: actions.sideBarState, state: 'hide'});
            break;
        case fromView.topBarActivate:
            this.dispatch({action: actions.topBarState, state: 'show'});
            break;
        case fromView.login:
            if (payload.email && payload.psw) {
                this.dispatch({action: actions.login, email: payload.email, psw: payload.psw});
            } else {
                console.log('skipping login, missing email or psw');
            }
            break;
        case fromView.logout:
            this.dispatch({action: actions.logout});
            break;
        default:
            console.error('unknown event', payload.event);
            break;
    }
};

module.exports = AppDispatcher;