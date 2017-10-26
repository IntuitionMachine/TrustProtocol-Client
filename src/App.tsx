import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { IndexPage } from "./components/IndexPage";
import { ApolloProvider } from "react-apollo";
import { Layout } from "./components/Layout";
import { ConfirmEmailPageWithMutations } from "./pages/ConfirmEmailPage/ConfirmEmailPage";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { BalancePage } from "./pages/BalancePage/BalancePage";

const { SERVER_URL, FOOBAR } = process.env;
const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_SERVER_URL });
const reduxDevtoolsMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o: { id: string }) => o.id,
});

const store = createStore(
  combineReducers(
    { form: formReducer }
  ),
  reduxDevtoolsMiddleware
);

const Routes = () => (
  <div>
    <Route exact={true} path="/" component={LandingPage} />
    <Route exact={true} path="/referrer/:referrerId" component={LandingPage} />
    <Route path="/confirm/:confirmationToken" component={ConfirmEmailPageWithMutations} />
    <Route path="/balances/:ethereumAddress" component={BalancePage} />
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export { App };