import React from 'react';
import {Route, browserHistory, Router, IndexRoute} from 'react-router';
import App from './containers/App/index';

const RouterMain= () =>{
	<Router history={browserHistory}>
		<Route path='/' component={App}>
		</Route>
	</Router>
}

export default RouterMain;