/** @jsx React.DOM */

var React = require('react'),
    D = React.DOM;

var NameList = React.createClass({
    render: function () {
        return D.ol(null,
            this.props.names.map(function (x) {
                return <li key={x}>{x}</li>;
            })
        );
    }
});

module.exports = NameList;