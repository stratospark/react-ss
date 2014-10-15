/** @jsx React.DOM */


// __tests__/sum-test.js
jest.dontMock('../react/components/NameList.jsx');

describe('NameList', function() {
    var React, TestUtils, NameList;

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        NameList = require('../react/components/NameList.jsx');
    });

    it('creates li for each name in names prop', function() {
        var names = ["a", "b", "c"],
            nameList = TestUtils.renderIntoDocument(<NameList names={names}/>),
            lis = TestUtils.scryRenderedDOMComponentsWithTag(nameList, "li");
        expect(lis.length).toEqual(3);
    });


});