var AppDispacher = require('./app-dispatcher');

var AppStoreCtor = function () {
    this.topBar = {timerId: null};
    this.sideBar = {};
};
require('microevent').mixin(AppStoreCtor);
var AppStore = new AppStoreCtor();

function sideBarStateSet(data) {
    this.sideBar.visible = data === 'open';
    this.trigger('sideBarVisible', this.sideBar.visible);
}

function topBarToggle() {
    var bar = AppStore.topBar;
    if (bar.timerId) {
        window.clearTimeout(bar.timerId);
        bar.timerId = null;
    }
    bar.visible = !bar.visible;
    if (bar.visible) {
        bar.timerId = setTimeout(topBarToggle, 5000);
    }
    //console.log("topBar " + (bar.visible ? "visible" : "invisible"));
    AppStore.trigger('topBarVisible', bar.visible);
}

var handlers = {
    'sideBar': sideBarStateSet,
    'topBar': topBarToggle
};

AppDispacher.register(function eventHandle(payload) {
    //console.log('eventHandle', payload.event);
    var handler = handlers[payload.action].bind(AppStore);
    handler(payload.data);
    return true; // flux promise resolution
});

module.exports = AppStore;