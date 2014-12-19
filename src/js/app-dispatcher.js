var Dispatcher = require('flux').Dispatcher;
var appEvents = require('./app-events');
var actions = appEvents.actions;
var fromView = appEvents.fromView;

var AppDispatcher = new Dispatcher();

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
            this.dispatch({action: actions.topBarState, state: 'toggle'});
            this.dispatch({action: actions.sideBarState, state: 'hide'});
            break;
        case fromView.topBarTap:
            this.dispatch({action: actions.topBarState, state: 'show'});
            break;
        case fromView.pageFrameMounted:
            this.dispatch({action: actions.topBarState, state: 'hide'});
            this.dispatch({action: actions.sideBarState, state: 'hide'});
            break;
        default:
            console.error('unknown event', payload.event);
            break;
    }
};

module.exports = AppDispatcher;