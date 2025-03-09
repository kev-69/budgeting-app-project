import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import BudgetPage from './Pages/BudgetPage';
import ExpensePage from './Pages/ExpensePage';
import NotFound from './Components/NotFound';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route path="/budget/:id" component={BudgetPage} />
      <Route path="/expenses" component={ExpensePage} />
      <Route component={NotFound} />
    </Router>
  );
};

export default App;
