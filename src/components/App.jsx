import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Routes } from './routing';

function App() {
  console.log('App: env:', process.env.REACT_APP_API_URL);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>

  );
}

export { App };
