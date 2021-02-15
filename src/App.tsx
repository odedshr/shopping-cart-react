import {  BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Filters from './filters/filters';
import Preferences from './preferences/preferences';
import ViewResults from './views/ViewResults';
import Cart from './cart/Cart';

const App = () => (
  <main className="App grid-container">
    <Router>
    <header className="hero">
      <div className="topBar">
        <h1 className="appTitle">Casa <sub>de</sub> Olaf</h1>
        <Cart />
      </div>
      <div className="breadcrumbs"><a href="/">home</a> / <a href="/products">products</a> / <a href="/products/delivery">delivery</a></div>
      <h2 className="pageTitle">Products for Delivery</h2>
    </header>
    <Filters />
    <Preferences />
  <ViewResults />
    </Router>
  </main>
);

export default App;
