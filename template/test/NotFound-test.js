import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import NotFound from '../src/containers/NotFound/NotFound';

describe('Not found page', function () {
  it('contains the text "Not found"', function () {
    expect(shallow(<NotFound />).contains(<h1>404!</h1>)).to.equal(true);
  });
});