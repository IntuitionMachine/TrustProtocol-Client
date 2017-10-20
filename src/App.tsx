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

const networkInterface = createNetworkInterface({ uri: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta" });

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