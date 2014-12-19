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
}, 'fv_');

AppEvents.actions = objPropsAutoValueSet({
    sideBarState: null,
    topBarState: null,
}, 'act_');

AppEvents.toView = objPropsAutoValueSet({
    sideBarVisible: null,
    topBarVisible: null,
}, 'tv_');

module.exports = AppEvents;