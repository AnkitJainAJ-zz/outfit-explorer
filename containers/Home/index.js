import React,{Component} from 'react';
import {getValidImageFile, extractCheckedDay} from '../../helpers/helper';
import * as CONSTANTS from '../../constants/index';
import './index.scss';
import {getLocalStorage, saveLocalStorage} from '../../helpers/localStorage';
import showOutfitComponent from '../../components/showOutfitComponent';
import BrowseOutfits from '../../components/BrowseOutfits';


class Home extends Component{
	constructor(props){
		super(props);
		this.handleUserAction = this.handleUserAction.bind(this);
		this.state={
			shirtUploadError:false,
			pantUploadError: false,
			shirtImageId: null,
			pantImageId: null,
			uploadError: false,
			dayError: false,
			showOutfits:false,
			day:null
		}
	}

	handleUserAction(e){
		const action=e.target.value;
		this.setState({
			shirtUploadError:false,
			pantUploadError:false,
			uploadError:false,
			dayError: false
		})

		var dayChoosen = extractCheckedDay('day-selector');
		if(!dayChoosen){
			this.setState({dayError:true});
			return;
		}

		if (action === "upload"){

			let fileList={};
			const shirtFiles=document.getElementById('dress-input-shirt').files;
			const pantFiles=document.getElementById('dress-input-pant').files;

			if(((shirtFiles[0] && shirtFiles[0].name) == this.state.shirtImageId) && ((pantFiles[0] && pantFiles[0].name) == this.state.pantImageId)){
				this.setState({
					uploadError: true
				})
				return
			}
			if(!(shirtFiles.length && pantFiles.length)){
				this.setState({
					shirtUploadError: !shirtFiles.length,
					pantUploadError: !pantFiles.length
				})
				return;
			}

			fileList["shirt"]=shirtFiles
			fileList["pant"]=pantFiles;
			console.log(fileList);


			// let day="monday";
			// let storageFiles = CONSTANTS.storageFiles;
			let dressList=getLocalStorage(dayChoosen)||[];
			let currentDress={"shirt":null, "pant":null};
		
			let shirtDataUrl=null;
			let pantDataUrl=null;

			// storageFiles[day].push({"shirt":null, "pant":null})

			for (const [k,v] of Object.entries(fileList)){
				if (v.length){
					const imageFile=getValidImageFile(v);
					const imageOutputTag=document.getElementById('dress-output-'+ k);

					imageOutputTag.addEventListener('load',()=>{

						let currentDay = extractCheckedDay('day-selector');
	  
				    	var imgCanvas = document.createElement("canvas"),
			            imgContext = imgCanvas.getContext("2d");

				        // Make sure canvas is as big as the picture
				        imgCanvas.width = imageOutputTag.width;
				        imgCanvas.height = imageOutputTag.height;
				        // Draw image into canvas element
				        imgContext.drawImage(imageOutputTag, 0, 0, imageOutputTag.width, imageOutputTag.height);

				        // Save image as a data URL
				        if (k==="shirt"){
				        	shirtDataUrl = imgCanvas.toDataURL("image/png");
				        	// storageFiles[day][storageFiles[day].length -1].shirt=shirtDataUrl;
				        	currentDress.shirt=shirtDataUrl;
				        	this.setState({
				    			shirtImageId:imageFile.name
				    		})
				        }
				        else{
				        	pantDataUrl = imgCanvas.toDataURL("image/png");
				        	// storageFiles[day][storageFiles[day].length -1].pant=pantDataUrl;
				        	currentDress.pant=pantDataUrl
				        	this.setState({
				    			pantImageId:imageFile.name
				    		})
				        }

				        // console.log(k,storageFiles);
				        if(shirtDataUrl && pantDataUrl){
							dressList.push(currentDress);
							saveLocalStorage(dressList,currentDay);
						}

		    		})
		    		imageOutputTag.src=window.URL.createObjectURL(imageFile);
				}
			}
			
		}
		else if(action === "browse"){
			this.setState({showOutfits:true, day:dayChoosen})
		}
	}

	render(){
		return(
			<div>
				<p>Outfit makes you special , dont let it make you boring by wearing same </p>
				<div >
					<div>
						{this.state.shirtUploadError? <span className="errorClass">Please upload a valid shirt image</span>:null}
						<input type="file" name="shirt" id="dress-input-shirt" accept="image/*"/>
						
					</div>
					<div>
						{this.state.pantUploadError? <span className="errorClass">Please upload a valid pant image</span>:null}
						<input type="file" name="pant" id="dress-input-pant" accept="image/*"/>
					</div>
					<div id="day-selector">
						<p>Choose the day you wore this dress on</p>
						{this.state.dayError?<span className="errorClass">Please Select any day to browse/upload</span>:null}
						<input type="radio" name="day" value="monday" ref={(input)=> this._input = input}/>Monday
						<input type="radio" name="day" value="tuesday" ref={(input)=> this._input = input}/>Tuesday
						<input type="radio" name="day" value="wednesday" ref={(input)=> this._input = input}/>Wednesday
						<input type="radio" name="day" value="thursday" ref={(input)=> this._input = input}/>Thursday
						<input type="radio" name="day" value="friday" ref={(input)=> this._input = input}/>Friday
						<input type="radio" name="day" value="saturday" ref={(input)=> this._input = input}/>Saturday
						<input type="radio" name="day" value="sunday" ref={(input)=> this._input = input}/>Sunday
					</div>
					<div>
						{this.state.uploadError?<span className="errorClass">Please upload both Shirt & Pant and different from last one</span>:null}
						<button type="submit" value="upload" onClick={this.handleUserAction}>Upload</button>	
					</div>
					
					<button type="submit" value="browse" onClick={this.handleUserAction}>Browse</button>
					{this.state.showOutfits ?
						<BrowseOutfits daySelected={this.state.day}/>:null}
				</div>

				<img src="" id="dress-output-shirt"/>
				<img src="" id="dress-output-pant"/>
			</div>
		)
	}
}

export default Home;