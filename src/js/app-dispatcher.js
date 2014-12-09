var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

AppDispatcher.dispatchAction = function eventTrigger(payload) {
    var data = null;
    switch (payload.event) {
        case 'viewSwipe':
            data = (payload.direction === 'right' ? 'open' : 'close');
            break;
    }
    //console.log('eventTrigger', payload, data);
    this.dispatch({
        action: this.events[payload.event],
        data: data
    });
};

AppDispatcher.events = {
    viewSwipe: 'sideBar',
    viewTap: 'topBar'
};

module.exports = AppDispatcher;