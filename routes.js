import React from 'react';
import {Route, browserHistory, Router, IndexRoute} from 'react-router';
import App from './containers/App';
import Home from './containers/Home';

const RouterMain= () =>
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Home}/>
		</Route>
	</Router>


export default RouterMain;