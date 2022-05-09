import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { applyMiddleware, combineReducers, compose } from 'redux'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import general from "./store/reducers";
import auth from "./store/reducers/auth";
import { setContext } from '@apollo/client/link/context';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


function configureStore() {
  const rootReducer = combineReducers({
    general: general,
    auth:auth
  });

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
}

const store = configureStore();
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:8000/ws/graphql',
}));


const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/',
  connectionParams: {
    authToken: localStorage.getItem('token'),
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `jwt  ${token}` : "",
    }
  }
}).concat(httpLink);



const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink,
);



export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

  </Provider>
);

