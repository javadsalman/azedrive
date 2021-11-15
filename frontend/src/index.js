import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/authReducer';
import driveReducer from './store/reducers/driveReducer';

// combine reducres on one rootReducer
const rootReducer = combineReducers({
    auth: authReducer,
    drive: driveReducer
});

// if browser has redux dev tools extension (for track redux actions) then aplly it as middleware and create store
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)));
else
    store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
