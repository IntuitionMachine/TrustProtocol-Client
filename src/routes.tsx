/**
 * Created by gopi on 1/8/17.
 */
import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
// import { IndexPage } from './components/IndexPage';
// import NotFoundPage from './components/NotFoundPage';
// import ConfirmEmailPage from './components/ConfirmEmailPage.js';

const routes = (
    <Route path="/" component={Layout}>
    hi
    </Route>
);

export default routes;

        // <Route component={NotFoundPage} />
        // <Route path="authenticate/:confirmationToken" component={ConfirmEmailPage} />