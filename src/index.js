import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './firebase'
import { BrowserRouter } from 'react-router-dom';

//import Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

//import de google fonts
<link href="https://fonts.googleapis.com/css2?family=Asap+Condensed:wght@300;400;600&display=swap" rel="stylesheet"></link>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


