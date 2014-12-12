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
                action: actions.sideBar,
                data: {open: payload.direction === 'right'}
            });
            break;
        case fromView.globTap:
            this.dispatch({action: actions.topBar});
            break;
        default:
            console.error('unknown event', payload.event);
            break;
    }
};

module.exports = AppDispatcher;