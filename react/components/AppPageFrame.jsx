/** @jsx React.DOM */

var React = require('react');
var Grid = require("react-bootstrap").Grid,
    Row = require("react-bootstrap").Row,
    Col = require("react-bootstrap").Col;
var AppEvents = require('../../src/js/app-events');
var AppDispatcher = require('../../src/js/app-dispatcher');
var AppPageFrame = React.createClass({
        componentDidMount: function () {
            AppDispatcher.dispatchAction({event: AppEvents.fromView.pageFrameMounted});
        },
        render: function () {
            return (
                <Grid fluid={true} className="app-page-frame">
                    <Row>
                        <Col
                            sm={10} smOffset={1}
                            md={8} mdOffset={2}
                            lg={6} lgOffset={3}>
                        {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
);

module.exports = AppPageFrame;