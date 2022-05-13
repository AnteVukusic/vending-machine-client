import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Navigation } from './Navigation';

function MainLayout({ children }) {
  return (
    <>
      <Navigation />
      <Container className="d-flex">
        {children}
      </Container>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export { MainLayout };
