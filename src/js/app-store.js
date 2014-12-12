var AppDispacher = require('./app-dispatcher');
var actionEvents = require('./app-events').actions;
var toViewEvents = require('./app-events').toView;

var AppStoreCtor = function () {
    this.topBar = {};
    this.sideBar = {};
};
require('microevent').mixin(AppStoreCtor);
var AppStore = new AppStoreCtor();

function barStateSet(args) {
    //console.log('barStateSet', args);
    var bar = args.bar;
    var vis;
    switch (args.state) {
        case 'show':
            vis = true;
            break;
        case 'hide':
            vis = false;
            break;
        case 'toggle':
            vis = !bar.visible;
            break;
        default:
            throw new Error('unexpected value for visible state ' + args.state);
    }
    bar.visible = vis;
    AppStore.trigger(args.trig, bar.visible);
    if (bar.timerId) {
        window.clearTimeout(bar.timerId);
        bar.timerId = null;
    }
    if (bar.visible && args.autoCloseTimerMs) {
        bar.timerId = setTimeout(function () {
            bar.visible = false;
            AppStore.trigger(args.trig, bar.visible);
        }, args.autoCloseTimerMs);
    }
}

function handleSideBarState(pl) {
    if (AppStore.topBar.visible) {
        barStateSet({
            bar: AppStore.topBar,
            state: 'hide',
            trig: toViewEvents.topBarVisible,
        });
    }
    barStateSet({
        bar: AppStore.sideBar,
        state: pl.state,
        trig: toViewEvents.sideBarVisible
    });
}

function handleTopBarState(pl) {
    !AppStore.sideBar.visible && barStateSet({
        bar: AppStore.topBar,
        state: pl.state,
        trig: toViewEvents.topBarVisible,
        autoCloseTimerMs: 5000
    });
}

var handlers = {};

handlers[actionEvents.sideBarState] = handleSideBarState;
handlers[actionEvents.topBarState] = handleTopBarState;

AppDispacher.register(function eventHandle(payload) {
    //console.log('eventHandle', payload);
    var handler = handlers[payload.action];
    handler(payload);
    return true; // flux promise resolution
});

module.exports = AppStore;