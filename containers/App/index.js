import React,{Component} from 'react';

class App extends Component {

	render(){
		return (
			<div>
				<p>This is AJ's first react app</p>
				{this.props.children}
			</div>
		)
	}
}

export default App;