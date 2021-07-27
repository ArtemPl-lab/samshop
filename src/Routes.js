import { Redirect, Route } from 'react-router-dom';
import * as Pages from './pages';
const Routes = props => {
    return(
        <>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home" component={Pages.Homepage} />
            <Route exact path="/orders" component={Pages.Orders} />
            <Route path="/orders/:id" component={Pages.OrderEdit} />
            <Route path="/about">
                <Pages.InnerPage title="Блок об авторе" pageId="about"/>
            </Route>
            <Route path="/requests" component={Pages.Requests} />
            <Route exact path="/complations" component={Pages.ComplationsPage} />
            <Route path="/complations/:path" component={Pages.ComplationEdit} />
            <Route path="/lists/:id" component={Pages.List} />
            <Route path="/parthners" component={Pages.Parthners} />
            <Route path="/designers" component={Pages.Designers} />
            <Route exact path="/accounts" component={Pages.Accounts} />
            <Route path="/accounts/:id" component={Pages.AccountsEdit} />
            <Route path="/pages" component={Pages.CustomPages} />
        </>
    );
}

export default Routes; 