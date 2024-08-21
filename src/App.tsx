import React from 'react';
import Providers from './contexts/Providers';
import HomePage from './containers/HomePage/HomePage';
import ErrorBoundary from './error-boundaries/ErrorBoundary';

import './assets/styles/index.css';

const App = () => (
  <ErrorBoundary>
    <Providers>
      <HomePage />
    </Providers>
  </ErrorBoundary>
);

export default App;
