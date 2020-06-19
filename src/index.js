import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getGlobalStatistic } from './actions/getGlobalStatistic';
import './styles/main.scss';
import { readCountriesFromFile } from './actions/readCountriesFromFile';

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(getGlobalStatistic());
store.dispatch(readCountriesFromFile());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
