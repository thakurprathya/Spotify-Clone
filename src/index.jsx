//in our app we have multiple time used ? after every api results this is because it checks whether data before it exists or
//not if it not exists it returns undefined which is better than error which will occur if we donot use this checks and api
//results fails
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; //The <Provider> component makes the Redux store available to any nested components that need to access the Redux store

import './index.css';
import App from './App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* wrapping app in redux provider for making store available in whole app*/}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
