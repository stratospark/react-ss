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
    globTap: null
}, 'fv_');

AppEvents.actions = objPropsAutoValueSet({
    sideBar: null,
    topBar: null
}, 'act_');

AppEvents.toView = objPropsAutoValueSet({
    sideBarVisible: null,
    topBarVisible: null
}, 'tv_');

module.exports = AppEvents;