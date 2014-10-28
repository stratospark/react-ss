/** @jsx React.DOM */

var React = require('react');

if (typeof(document) !== "undefined") {
    var Map = require("react-leaflet").Map,
        TileLayer = require("react-leaflet").TileLayer,
        Marker = require("react-leaflet").Marker,
        Popup = require("react-leaflet").Popup;
}

// Got code inspiration from Stephen J. Collings
// https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/reactjs/YYgETx8soUo/kttCp9qTRBAJ
var shouldRenderForClientMixin = {
    componentDidMount: function () {
        this.setState({
            renderForClient: true
        })
    },

    shouldRenderForClient: function () {
        try {
            return typeof(document) !== "undefined" && this.state.renderForClient;
        } catch (e) {
            return false;
        }
    }
};

var Maps = React.createClass({
    mixins: [shouldRenderForClientMixin],

    getInitialState: function () {
        console.log("Maps initial state");
        return {
            zoom: 13
        }
    },

    componentDidMount: function () {
        console.log("Maps did mount");
        window.map = this.refs.my_map;//.state.map;
        console.log(window.map);
    },

    componentDidUpdate: function () {
        console.log("Maps did update");
        try {
            window.map.setZoom(this.state.zoom);
        } catch (e) {
        }
    },

    componentWillUnmount: function () {
        console.log("Maps will unmount");
    },

    render: function () {
        if (!this.shouldRenderForClient()) {
            // server code
            return (
                <div>
                    <h1>Maps</h1>
                    <p>Static map here.</p>
                </div>
            )
        } else {
            //var url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
            var url = "http://{s}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png";
            return (
                <div>
                    <h1>Maps</h1>
                    <Map ref="my_map" center={[37.354108, -121.955236]} zoom={13}>
                        <TileLayer url={url}/>
                    </Map>
                </div>
            );
        }
    }
});

module.exports = Maps;





