function objPropsAutoValueSet(obj, prfx) {
    var ret = {};
    Object.getOwnPropertyNames(obj).forEach(function (prop) {
        ret[prop] = prfx + prop;
    });
    return ret;
};

var AppEvents = {};

AppEvents.fromView = objPropsAutoValueSet({
    globSwipe: null,
    globTap: null,
    topBarTap: null,
    pageFrameMounted: null,
    topBarActivate: null,
    login: null,
    logout: null,
}, 'fv_');

AppEvents.actions = objPropsAutoValueSet({
    sideBarState: null,
    topBarState: null,
    login: null,
    logout: null,
}, 'act_');

AppEvents.toView = objPropsAutoValueSet({
    sideBarVisible: null,
    topBarVisible: null,
    loginReply: null,
    logoutComplete: null,
}, 'tv_');

module.exports = AppEvents;