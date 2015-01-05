var AppDispatcher = require('./app-dispatcher');
var actionEvents = require('./app-events').actions;
var toViewEvents = require('./app-events').toView;
var $ = require('jquery');

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
    barStateSet({
        bar: AppStore.sideBar,
        state: pl.state,
        trig: toViewEvents.sideBarVisible
    });
    if (AppStore.sideBar.visible && AppStore.topBar.visible) {
        barStateSet({
            bar: AppStore.topBar,
            state: 'hide',
            trig: toViewEvents.topBarVisible,
        });
    }
}

function handleTopBarState(pl) {
    !AppStore.sideBar.visible && barStateSet({
        bar: AppStore.topBar,
        state: pl.state,
        trig: toViewEvents.topBarVisible,
        autoCloseTimerMs: 5000
    });
}

function handleLogin(pl) {
    //console.log('logging in', pl);
    function success(data) {
        //console.log('login reply', data);
        if (data.sessionToken) {
            AppStore.session = {
                user: {email: pl.email},
                token: data.sessionToken,
            }
        }
        AppStore.trigger(toViewEvents.loginReply, !!data.sessionToken);
    }

    function error(hdr, str) {
        console.log('error', hdr, str);
    }

    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: {email: pl.email, psw: pl.psw},
        success: success,
        error: error,
    });
}

function handleLogout() {
    if (!AppStore.session) {
        return;
    }
    //console.log('logging out');
    function success(data) {
        //console.log('logout reply', data);
        AppStore.session = null;
        AppStore.trigger(toViewEvents.logoutComplete);
    }

    function error(hdr, str) {
        console.log('error', hdr, str);
    }

    $.ajax({
        type: 'POST',
        url: '/api/logout',
        data: {sessionToken: AppStore.session.token},
        success: success,
        error: error,
    });
}

var handlers = {};

handlers[actionEvents.sideBarState] = handleSideBarState;
handlers[actionEvents.topBarState] = handleTopBarState;
handlers[actionEvents.login] = handleLogin;
handlers[actionEvents.logout] = handleLogout;

AppDispatcher.register(function eventHandle(payload) {
    //console.log('eventHandle', payload);
    var handler = handlers[payload.action];
    handler ? handler(payload) : console.log('missing handler for action', payload.action);
    return true; // flux promise resolution
});

module.exports = AppStore;