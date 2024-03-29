import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import ToastContainer from './components/ToastContainer/ToastContainer'
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
      <ToastContainer />
   </Provider>
  </React.StrictMode>
);