var AppDispacher = require('./app-dispatcher');
var actionEvents = require('./app-events').actions;
var toViewEvents = require('./app-events').toView;

var AppStoreCtor = function () {
    this.topBar = {timerId: null};
    this.sideBar = {};
};
require('microevent').mixin(AppStoreCtor);
var AppStore = new AppStoreCtor();

function sideBarStateSet(data) {
    var bar = this.sideBar;
    bar.visible = data.open;
    this.trigger(toViewEvents.sideBarVisible, bar.visible);
    //console.log("sideBar " + (bar.visible ? "visible" : "invisible"));
}

function topBarToggle() {
    var bar = this.topBar;
    if (bar.timerId) {
        window.clearTimeout(bar.timerId);
        bar.timerId = null;
    }
    bar.visible = !bar.visible;
    if (bar.visible) {
        bar.timerId = setTimeout(topBarToggle.bind(this), 5000);
    }
    //console.log("topBar " + (bar.visible ? "visible" : "invisible"));
    AppStore.trigger(toViewEvents.topBarVisible, bar.visible);
}

var handlers = {};

handlers[actionEvents.sideBar] = sideBarStateSet;
handlers[actionEvents.topBar] = topBarToggle;

AppDispacher.register(function eventHandle(payload) {
    //console.log('eventHandle', payload.event);
    var handler = handlers[payload.action].bind(AppStore);
    handler(payload.data);
    return true; // flux promise resolution
});

module.exports = AppStore;