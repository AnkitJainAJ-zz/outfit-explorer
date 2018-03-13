import React, {Component} from 'react';
import {getLocalStorage} from '../../helpers/localStorage';

class BrowseOutfits extends Component {

	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.daySelected === nextProps.daySelected){
			return false
		}
		return true;
	}

	render() {
		const {daySelected}=this.props;
		const dressList = getLocalStorage(daySelected) || [];
		return (
			<div>
			{dressList.map((item,index)=>
				<div key={index}>
					<img src={item.shirt}/>
					<img src={item.pant}/>
				</div>
			)}
			</div>
		)
	}
}

export default BrowseOutfits;