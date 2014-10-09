/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var NameList = React.createClass({
    render: function () {
        var stuff = D.ol(null,
            this.props.names.map(function (x) {
                return D.li(null, x)
            })
        );
        return (
            stuff
        );
    }
});

module.exports = NameList;