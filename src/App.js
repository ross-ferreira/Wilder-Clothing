import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/Hompage.component';
import ShopPage from './pages/shop/Shop.component.jsx';
import Header from './components/header/Header.component.jsx';

const HatsPage = () => {};

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
