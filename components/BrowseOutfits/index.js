import React, {Component} from 'react';
import {getLocalStorage} from '../../helpers/localStorage';
import './index.scss';

class BrowseOutfits extends Component {

	constructor(props){
		super(props);
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	if(this.props.daySelected === nextProps.daySelected){
	// 		return false
	// 	}
	// 	return true;
	// }

	render() {
		const {daySelected}=this.props;
		const dressList = getLocalStorage(daySelected) || [];
		return (
			<div>
			{dressList.map((item,index)=>
				<div key={index} className="showDress">
					{item.shirt?<img src={item.shirt} className="imageOutput"/>:null}
					{item.pant?<img src={item.pant} className="imageOutput"/>:null}
				</div>
			)}
			</div>
		)
	}
}

export default BrowseOutfits;