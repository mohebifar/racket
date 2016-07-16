import React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
import <%= name %> from '<%= path %>/<%= name %>';

describe('<%= name %>', function () {
  it('should contain "This is <%= name %>!"', function () {
    expect(render(<<%= name %> />).text()).to.contain('This is <%= name %>!');
  });
});