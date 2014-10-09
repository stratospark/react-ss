var React = require("react"),
    App = require("../react/app.jsx");

window.app = (function() {
    return React.renderComponent(<App/>, document.body);
})();