/** @jsx React.DOM */

var React = require('react');
var Grid = require("react-bootstrap").Grid,
    Row = require("react-bootstrap").Row,
    Col = require("react-bootstrap").Col;

var AppPageFrame = React.createClass({
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