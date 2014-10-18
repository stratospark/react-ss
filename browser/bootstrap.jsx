var React = require("react"),
    routes = require("../react/app.jsx").routes;

window.app = (function() {
    return React.renderComponent(routes, document);
})();

window.React = React;