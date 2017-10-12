/**
 * Created by gopi on 1/8/17.
 */
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { IndexPage } from './IndexPage';
import { ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta'});

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: (o: {id: string}) => o.id
});

const App = () => (
    <div> 
      <Route path="/" component={IndexPage}/>
     </div>
);

export default class AppRoutes extends React.Component {
    render() {

        return (
            <ApolloProvider client={client}>
                <BrowserRouter >
                    <App/>
                </BrowserRouter >
            </ApolloProvider>
        );
    }
}
