import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import NotFound from '../src/containers/NotFound/NotFound';

describe('Not found page', function () {
  it('contains the text "Not found"', function () {
    expect(shallow(<NotFound />).contains(<span>Page not found :(</span>)).to.equal(true);
  });
});