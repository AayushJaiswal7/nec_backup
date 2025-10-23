import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import PageTitleManager from './utils/PageTitleManager.jsx';

const App = () => {
  return (
    <Router>
      <PageTitleManager />
      <AppRoutes />
    </Router>
  );
};

export default App;