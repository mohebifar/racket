import 'babel-polyfill';
import React from 'react';
import {expect} from 'chai';
import {shallow, render} from 'enzyme';
import {Provider} from 'react-redux';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import GithubHottest from 'containers/GithubHottest/GithubHottest';
import RepositoryInfo from 'components/Github/RepositoryInfo';
const client = new ApiClient();

const setup = (state) => {
  const store = createStore(client, {githubHottest: state});
  const component = <Provider store={store}><GithubHottest /></Provider>;

  return {component, store};
};

const mockRepository = () => {
  return {
    full_name: 'Test',
    stargazers_count: 2000,
    owner: {
      avatar_url: 'URL',
      login: 'test'
    }
  };
};

describe('Github hottest page', function () {
  it('renders loading text while the data is being loaded from the API', function () {
    const {component} = setup({
      loaded: false,
      loading: true,
      data: []
    });

    expect(render(component).text()).to.contain('Please wait while loading the data from Github API...');
  });

  it('renders one RepositoryInfo for each repository in the store', function () {
    const {component, store} = setup({
      loaded: true,
      loading: false,
      data: [mockRepository(), mockRepository(), mockRepository()]
    });

    const shallowOption = {context: {store}};

    expect(
      shallow(component).shallow(shallowOption).shallow(shallowOption).shallow(shallowOption).find(RepositoryInfo)
    ).to.have.length(3);
  });
});