import React,{Component} from 'react';
import {getValidImageFile, extractCheckedDay} from '../../helpers/helper';
import * as CONSTANTS from '../../constants/index';
import './index.scss';
import {getLocalStorage, saveLocalStorage} from '../../helpers/localStorage';
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
				<p className="headerClass">Outfit makes you special , dont let it make you look boring by wearing same </p>
				<div className="mainWrapper">
					<div className="fileInputWrapper">
						<div className="fileInput">
							<p className="fileInput__text">Please upload shirt image</p> 
							<input type="file" name="shirt" id="dress-input-shirt" accept="image/*"/>
							{this.state.shirtUploadError? <div className="errorClass">Please upload a valid shirt image</div>:null}
							<img src="https://goo.gl/WXzKgn" id="dress-output-shirt" className="imageOutput"/>
							
						</div>
						
					</div>
					<div className="fileInputWrapper">
						<div className="fileInput">
							<p className="fileInput__text">Please upload trouser image</p> 
							<input type="file" name="pant" id="dress-input-pant" accept="image/*"/>
							{this.state.pantUploadError? <div className="errorClass">Please upload a valid pant image</div>:null}
							<img src="https://goo.gl/WXzKgn" id="dress-output-pant" className="imageOutput"/>
						</div>

					</div>
					<div id="day-selector" className="daySelector">
						<p>Choose the day you wore this dress on</p>
						<input type="radio" name="day" value="monday" id="monday"/>Monday&nbsp;&nbsp;
						<input type="radio" name="day" value="tuesday" id="tuesday"/>Tuesday&nbsp;&nbsp;
						<input type="radio" name="day" value="wednesday" id="wednesday"/>Wednesday&nbsp;&nbsp;
						<input type="radio" name="day" value="thursday" id="thursday"/>Thursday&nbsp;&nbsp;
						<input type="radio" name="day" value="friday" id="friday"/>Friday&nbsp;&nbsp;
						<input type="radio" name="day" value="saturday" id="saturday"/>Saturday&nbsp;&nbsp;
						<input type="radio" name="day" value="sunday" id="sunday"/>Sunday&nbsp;&nbsp;
						{this.state.dayError?<span className="errorClass">Please Select any day to browse/upload</span>:null}
					</div>

					<div className="buttonWrapper">
						<div className="buttonClass">
							<button className="btn"type="submit" value="upload" onClick={this.handleUserAction}>Upload</button>
							{this.state.uploadError?<div className="errorClass">Please upload both Shirt & Pant and different from last one</div>:null}	
						</div>
						
						<div className="buttonClass">
						<button className="btn" type="submit" value="browse" onClick={this.handleUserAction}>Browse</button>
						</div>
					</div>


					{this.state.showOutfits ?
						<BrowseOutfits daySelected={this.state.day}/>:null}
				</div>

				
				
			</div>
		)
	}
}

export default Home;