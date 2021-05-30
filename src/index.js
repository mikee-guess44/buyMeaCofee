import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'

import { DAppProvider } from '@usedapp/core'
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <DAppProvider>
      <App />
    </DAppProvider>
  </Provider>,
  document.getElementById('root')
)
