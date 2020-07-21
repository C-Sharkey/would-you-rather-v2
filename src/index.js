import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

// Added redux dev tools to help with some issues
const store = createStore(
  reducer, 
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ))

ReactDOM.render(

  <Provider store={store}>
      <App />
  </Provider>,

document.getElementById('root')
);
