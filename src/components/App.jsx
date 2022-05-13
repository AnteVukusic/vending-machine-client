import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import { store } from '../store/store';
import { Routes } from './routing';

function App() {
  return (
    <Provider store={store}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Routes />
        </div>
      </Container>
    </Provider>

  );
}

export { App };
