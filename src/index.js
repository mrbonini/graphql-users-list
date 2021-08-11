import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { routes } from './routes';

import env from './env';
import './index.css';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const App = () => {
  return (
    <Router>
      <Switch>
        {
          routes.map((route, idx) => (
            <Route path={route.path} exact={route.exact} component={route.component} key={`route-${idx}`}/>
          ))
        }
      </Switch>
    </Router>
  );
}

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));