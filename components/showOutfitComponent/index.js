import React,{Component} from 'react';
import {getLocalStorage} from '../../helpers/localStorage';


class showOutfitComponent extends Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.daySelected === nextProps.daySelected){
			return false
		}
	}

	render(){
		const {daySelected}=this.props;
		const dressList = getLocalStorage(daySelected);
		return(
			dressList.map((item,index)=>{
				<div>
					<img src={item.shirt}/>
					<img src={item.pant}/>
				</div>
			})
		)
	}
}

export default showOutfitComponent;