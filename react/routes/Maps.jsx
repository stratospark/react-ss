/** @jsx React.DOM */

var React = require('react');

var Map = require("react-leaflet").Map,
    TileLayer = require("react-leaflet").TileLayer,
    Marker = require("react-leaflet").Marker,
    Popup = require("react-leaflet").Popup;


var Maps = React.createClass({
    render: function () {
        return (
            <Map center={[51.505, -0.09]} zoom={13} />
        );
    }
});

module.exports = Maps;